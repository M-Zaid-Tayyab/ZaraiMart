import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useStyle } from './style';
import { Props } from './types';
const NotificationCard: React.FC<Props> = props => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.rowContainer, props?.style]}>
      <View style={styles.row}>
        <View style={styles.greenCircle}>
        <FastImage
          source={props?.leftIcon}
          style={styles.leftIcon}
          resizeMode="contain"
        />
        </View>
        <View style={styles.addressContainer}>
          <View style={styles.row}>
            <Text style={styles.titleText}>{props?.title}</Text>
          </View>
          <Text style={styles.addressText}>{props?.description}</Text>
        </View>
      </View>
    </View>
  );
};
export default NotificationCard;
