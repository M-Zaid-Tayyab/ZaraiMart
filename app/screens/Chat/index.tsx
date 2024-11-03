import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {GiftedChat, Bubble, MessageText} from 'react-native-gifted-chat';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import {useStyle} from './styles';
import {useSelector} from 'react-redux';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';

const Chat = ({route}) => {
  const params = route?.params;
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = useStyle();
  const [messages, setMessages] = useState([]);
  const user = useSelector(state => state?.userReducer?.user);
  const [isSending, setIsSending] = useState(false);
  const loggedInUserId = user?.uid;
  const otherUserId = params?.otherUserId;
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      Keyboard.dismiss();
      setTimeout(() => {
        navigation.dispatch(e.data.action);
      }, 30);
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);
  const getOrCreateChatRoom = async (userId1, userId2) => {
    const chatRoomId =
      userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;

    const chatRoomDoc = await firestore()
      .collection('chats')
      .doc(chatRoomId)
      .get();

    if (!chatRoomDoc.exists) {
      await firestore()
        .collection('chats')
        .doc(chatRoomId)
        .set({
          participants: [userId1, userId2],
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      await firestore()
        .collection('users')
        .doc(userId1)
        .collection('conversations')
        .doc(chatRoomId)
        .set({
          chatRoomId,
          otherUserId: userId2,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      await firestore()
        .collection('users')
        .doc(userId2)
        .collection('conversations')
        .doc(chatRoomId)
        .set({
          chatRoomId,
          otherUserId: userId1,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
    }

    return chatRoomId;
  };

  useEffect(() => {
    const loadChat = async () => {
      const chatRoomId = await getOrCreateChatRoom(loggedInUserId, otherUserId);

      const unsubscribe = firestore()
        .collection('chats')
        .doc(chatRoomId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          const fetchedMessages = querySnapshot.docs.map(doc => {
            const firebaseData = doc.data();

            const data = {
              _id: doc.id,
              text: firebaseData.text,
              createdAt: firebaseData.createdAt
                ? firebaseData.createdAt.toDate?.()
                : new Date(),
              user: {
                _id: firebaseData.user._id,
                name: firebaseData.user.name,
                avatar: firebaseData.user.avatar || null,
              },
            };
            return data;
          });
          setMessages(fetchedMessages);
        });

      return () => unsubscribe();
    };

    loadChat();
  }, []);

  const onSend = async newMessages => {
    setIsSending(true);
    const chatRoomId = await getOrCreateChatRoom(loggedInUserId, otherUserId);
    await firestore().collection('chats').doc(chatRoomId).update({
      lastMessage: newMessages[0].text,
      lastMessageDate: firestore.FieldValue.serverTimestamp(),
    });
    await firestore()
      .collection('chats')
      .doc(chatRoomId)
      .collection('messages')
      .add({
        text: newMessages[0].text,
        createdAt: firestore.FieldValue.serverTimestamp(),
        user: newMessages[0].user,
      });
    setIsSending(false);
  };
  const renderMessageText = props => {
    return <MessageText {...props} textStyle={styles.messageText} />;
  };
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={styles.bubbleWrapperStyle}
        timeTextStyle={styles.timeTextStyle}
      />
    );
  };
  const renderSend = props => {
    return isSending ? (
      <ActivityIndicator
        size="small"
        color={theme.colors.primaryButton}
        style={styles.sendButton}
      />
    ) : (
      <TouchableOpacity
        style={styles.sendButton}
        onPress={() => {
          props?.text.length > 0 && props.onSend({text: props.text.trim()});
        }}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Chat"
        style={{paddingHorizontal: widthPercentageToDP(3)}}
      />
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderMessageText={renderMessageText}
        renderSend={renderSend}
        onSend={newMessages => onSend(newMessages)}
        user={{_id: loggedInUserId}}
      />
    </SafeAreaView>
  );
};

export default Chat;
