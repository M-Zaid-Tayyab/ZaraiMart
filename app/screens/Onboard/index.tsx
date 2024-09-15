import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  LayoutAnimation,
  SafeAreaView,
  Text,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import {
  widthPercentageToDP
} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import { onBoardingCompleted } from '../../redux/slices/userSlice';
import { useStyle } from './styles';
const Onboard: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const dispatch=useDispatch();
  const [page, setPage] = useState(1);
  const imageSource = () => {
    return page == 1
      ? images.Onboard.page1
      : page == 2
      ? images.Onboard.page2
      : images.Onboard.page3;
  };
  const getParagraph = () => {
    return page == 1
      ? 'We provide high quality crops just for you'
      : page == 2
      ? 'Your satisfaction is our number one priority'
      : "Let's Shop Your Favorite crops with our App Now!";
  };
  const changePage = () => {
    if (page != 3) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setPage(prev => prev + 1);
    } else {
      dispatch(onBoardingCompleted());
      // navigation.navigate('Signup');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <FastImage
        source={imageSource()}
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={styles.heading}>{getParagraph()}</Text>
      <View style={styles.dotContainer}>
        <View style={page == 1 ? styles.longDot : styles.shortDot} />
        <View style={page == 2 ? styles.longDot : styles.shortDot} />
        <View style={page == 3 ? styles.longDot : styles.shortDot} />
      </View>
      <PrimaryButton
        title={page !== 3 ? 'Next' : 'Get Started'}
        onPress={changePage}
        style={[
          styles.button,
          {
            width:
              page !== 3 ? widthPercentageToDP(17) : widthPercentageToDP(30),
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default Onboard;
