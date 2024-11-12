import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import images from '../../config/images';
import { useStyle } from './styles';

const Inbox: React.FC = () => {
  const styles = useStyle();
  const navigation = useNavigation();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const user = useSelector(state => state?.userReducer?.user);
  const [inbox, setInbox] = useState();
  function formatFirebaseTimestamp(firebaseTimestamp) {
    const dateObject = firebaseTimestamp.toDate();
    const now = new Date();
    const isSameDay = (date1, date2) =>
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();

    const isYesterday = date => {
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      return isSameDay(date, yesterday);
    };

    const isSameWeek = date => {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      return date >= weekStart;
    };
    const formatDate = date => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    if (isSameDay(dateObject, now)) {
      return dateObject.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    if (isYesterday(dateObject)) {
      return 'Yesterday';
    }
    if (isSameWeek(dateObject)) {
      return dateObject.toLocaleDateString('en-US', {weekday: 'long'});
    }
    return formatDate(dateObject);
  }

  const Message = props => (
    <TouchableOpacity style={styles.rowContainer} onPress={props?.onPress}>
      <FastImage
        source={props?.leftIcon}
        style={styles.leftIcon}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.titleText}>{props?.user}</Text>
          {props?.unread && (
            <View style={styles.greenContainer}>
              <Text style={styles.unreadText}>{props?.unread}</Text>
            </View>
          )}
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText} numberOfLines={1}>
            {props?.message} {'.....'}
          </Text>
          <Text style={styles.dateText}>{props?.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const renderChat = ({item}) => {
    return (
      <Message
        leftIcon={
          item?.otherUserData?.profileUrl || images.Home.userPlaceholder
        }
        user={item?.otherUserData?.name}
        message={item?.chatRoomData?.lastMessage}
        unread={item?.unread}
        date={formatFirebaseTimestamp(item?.chatRoomData?.lastMessageDate)}
        onPress={() => {
          navigation.navigate('Chat', {otherUserId: item?.otherUserId});
        }}
      />
    );
  };
  const getUserChatsWithOtherUser = async () => {
    try {
      const userDataList = [];
      const querySnapshot = await firestore()
        .collection('chats')
        .where('participants', 'array-contains', user?.uid)
        .get();
      for (const doc of querySnapshot.docs) {
        const chatRoomData = doc.data();
        const participants = chatRoomData.participants;
        const otherUserId = participants.find(id => id !== user?.uid);

        if (otherUserId) {
          const otherUserSnapshot = await firestore()
            .collection('users')
            .doc(otherUserId)
            .get();

          if (otherUserSnapshot.exists) {
            userDataList.push({
              chatRoomId: doc.id,
              otherUserData: otherUserSnapshot.data(),
              otherUserId: otherUserId,
              chatRoomData: chatRoomData,
            });
          }
        }
      }

      setInbox(userDataList);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if(isFocused){
    getUserChatsWithOtherUser();
    }
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Header title="Inbox" />
        {isLoading ? (
          <ActivityIndicator
            style={{marginTop: heightPercentageToDP(2)}}
            color={theme.colors.primaryButton}
            size={'large'}></ActivityIndicator>
        ) : (
          <View style={styles.FlatListContainer}>
            <FlatList renderItem={renderChat} data={inbox} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Inbox;
