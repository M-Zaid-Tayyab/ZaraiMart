import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {isTablet} from 'react-native-device-info';

export const useStyle = () => {
  const theme = useTheme();

  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.greyBackground,
      },
      subContainer:{
        paddingHorizontal:widthPercentageToDP(3),
      },
      orderCardStyle:{
        marginTop: heightPercentageToDP(2),
      },
    });
  return React.useMemo(() => styles(), []);
};
