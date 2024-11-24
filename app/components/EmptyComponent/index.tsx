import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useStyle } from './style';
import { Props } from './types';
import FastImage from "@d11/react-native-fast-image";
import { widthPercentageToDP } from 'react-native-responsive-screen';
const EmptyComponent: React.FC<Props> = props => {
  const styles = useStyle();
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={styles.mainView}>
      {/* <LottieView
        source={require('../../assets/Animations/notFound.json')}
        autoPlay
        loop
        style={styles.lottie}
      /> */}
      <FastImage
      source={require('../../assets/notFoundImg.png')}
      style={styles.lottie}
      resizeMode='contain'
      />
      <Text
      style={{
        fontFamily:theme.fonts.semiBoldFont,
        fontSize:widthPercentageToDP(5.5),
        color:theme.colors.primaryText
      }}
      >
        No data found
      </Text>
    </View>
  );
};
export default React.memo(EmptyComponent);
