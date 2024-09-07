import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Bubble, GiftedChat, MessageText} from 'react-native-gifted-chat';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import images from '../../config/images';
import {useStyle} from './styles';
const Chat: React.FC = () => {
  const styles = useStyle();
  const navigation = useNavigation();
  const theme = useTheme();
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Hello!',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      },
    },
    {
      _id: 2,
      text: 'Hi there!',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'You',
      },
    },
    {
      _id: 3,
      text: 'How are you?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      },
    },
    {
      _id: 4,
      text: "I'm doing well, thank you!",
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'You',
      },
    },
    {
      _id: 5,
      text: 'That sounds great!',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      },
    },
  ]);

  const onSend = (newMessages = []) => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
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
    return (
      <TouchableOpacity
        style={styles.sendButton}
        onPress={() => {
          props?.text.length > 0 && props.onSend({text: props.text.trim()});
        }}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    );
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Harry',
      headerShown: true,
      headerStyle: {
        backgroundColor: theme.colors.background,
        borderBottomWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
      },
      headerLeft: () => {
        return (
          <Pressable
            onPress={() => navigation.goBack()}
            style={{paddingLeft: widthPercentageToDP(3)}}>
            <FastImage
              source={images.ForgotPassword.backButton}
              style={{
                height: heightPercentageToDP(4),
                width: widthPercentageToDP(6),
              }}
              resizeMode="contain"
            />
          </Pressable>
        );
      },
      headerTitleStyle: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(5.6),
      },
      headerTransparent: false,
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderMessageText={renderMessageText}
        loadEarlier
        renderSend={renderSend}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};

export default Chat;
