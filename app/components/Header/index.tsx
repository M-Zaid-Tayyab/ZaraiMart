import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import images from '../../config/images';
import { useStyle } from './style';
import { Props } from './types';
const Header: React.FC<Props> = props => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <View style={[styles.flexRow, props.style]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FastImage
          source={images.ForgotPassword.backButton}
          style={styles.icn}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.nameText}>{props?.title}</Text>
      <FastImage
        source={props?.rightIcn}
        style={[
          styles.icn,
          {
            opacity: props?.rightIcn ? 1 : 0,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};
export default Header;
