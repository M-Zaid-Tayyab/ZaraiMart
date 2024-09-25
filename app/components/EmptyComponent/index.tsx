import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useStyle } from './style';
import { Props } from './types';
import FastImage from 'react-native-fast-image';
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
    </View>
  );
};
export default React.memo(EmptyComponent);
