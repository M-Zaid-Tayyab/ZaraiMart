import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import Header from '../../components/Header';
import { messages } from '../../utils/dummyData';
import { useStyle } from './styles';
import { useNavigation } from '@react-navigation/native';
import images from '../../config/images';
const Inbox: React.FC = () => {
  const styles = useStyle();
  const navigation=useNavigation();
  const theme = useTheme();
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
  const renderChat = ({item}) => (
    <Message
      leftIcon={item?.leftIcon}
      user={item?.user}
      message={item?.message}
      unread={item?.unread}
      date={item?.date}
      onPress={()=>{navigation.navigate("Chat");}}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Header title='Inbox' />
        <View style={styles.FlatListContainer}>
          <FlatList renderItem={renderChat} data={messages} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Inbox;
