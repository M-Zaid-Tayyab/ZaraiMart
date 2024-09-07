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
      checkBoxText: {
        fontFamily: theme.fonts.semiBoldFont,
        color: theme.colors.primaryText,
        fontSize: widthPercentageToDP(3.4),
      },
      text: {
        color: theme.colors.placeholderText,
        fontFamily: theme.fonts.regularFont,
        alignSelf: 'flex-start',
        paddingHorizontal: widthPercentageToDP(4),
        marginBottom: heightPercentageToDP(3),
      },
      iconStyle: {
        borderColor: theme.colors.primaryButton,
        borderWidth: widthPercentageToDP(0.64),
        borderRadius: widthPercentageToDP(1.7),
      },
      loginButton: {
        backgroundColor: theme.colors.background,
        marginTop: heightPercentageToDP(2),
      },
    });
  return React.useMemo(() => styles(), []);
};
