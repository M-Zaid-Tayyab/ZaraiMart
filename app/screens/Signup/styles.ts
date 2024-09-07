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
        backgroundColor: theme.colors.background,
      },
      contentContainer: {
        paddingTop: heightPercentageToDP(3),
        alignItems: 'center',
        paddingBottom: heightPercentageToDP(10),
      },
      title: {
        fontWeight: 'bold',
        color: theme.colors.primaryText,
      },
      logo: {
        height: heightPercentageToDP(16),
        width: widthPercentageToDP(32),
        alignSelf: 'center',
        marginBottom: heightPercentageToDP(2),
      },
      icons: {
        height: heightPercentageToDP(2.1),
        width: widthPercentageToDP(4.1),
      },
      heading: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(5.7),
        alignSelf: 'flex-start',
        paddingHorizontal: widthPercentageToDP(4),
        marginBottom: heightPercentageToDP(0.5),
      },
      controller: {marginVertical: heightPercentageToDP(0.8)},
      error: {
        color: 'red',
        paddingVertical: heightPercentageToDP(0.5),
        fontSize: isTablet() ? widthPercentageToDP(2) : undefined,
      },
      text: {
        color: theme.colors.placeholderText,
        fontFamily: theme.fonts.regularFont,
        alignSelf: 'flex-start',
        paddingHorizontal: widthPercentageToDP(4),
        marginBottom: heightPercentageToDP(3),
      },
      socialImage: {
        height: heightPercentageToDP(4),
        width: widthPercentageToDP(8),
      },
      loginButton: {
        backgroundColor: theme.colors.background,
        marginTop: heightPercentageToDP(2),
      },
    });
  return React.useMemo(() => styles(), []);
};
