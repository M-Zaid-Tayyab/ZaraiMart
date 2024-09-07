import {StyleSheet,Platform} from 'react-native';
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
      // container: {
      //   flex: 1,
      //   backgroundColor: theme.colors.background,
      // },
      page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      container: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),
      },
      map: {
        flex: 1
      },
      marker: {
        height: 30,
        width: 30,
        backgroundColor: '#00f',
        borderRadius: 15,
        borderColor: '#fff',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
      },
      markerInner: {
        height: 15,
        width: 15,
        backgroundColor: '#00f',
        borderRadius: 7.5,
      },
    });
  return React.useMemo(() => styles(), []);
};
