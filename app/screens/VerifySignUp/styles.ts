
import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const useStyle = () => {
  const theme = useTheme();

  const styles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      contentContainer: {paddingBottom: heightPercentageToDP(3)},
      subContainer: {
        paddingTop: heightPercentageToDP(35),
        paddingHorizontal: widthPercentageToDP(4),
        alignItems:'center',
        justifyContent: 'center',
      },
      text2: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.mediumFont,
        fontSize: widthPercentageToDP(3.5),
      },
      button: {
        marginTop: heightPercentageToDP(20.7),
      },
      resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      containerStyle: {
        marginVertical:heightPercentageToDP(5),
      },
      otpTextInput: {
        fontSize: widthPercentageToDP(4.3),
        marginHorizontal:widthPercentageToDP(3),
        width: widthPercentageToDP(18),
        color: theme.colors.primaryText5,
        borderRadius: widthPercentageToDP(3.5),
        backgroundColor: theme.colors.textViewBackground,
        fontFamily: theme.fonts.boldFont,
        borderBottomWidth: widthPercentageToDP(0.26),
        borderWidth: widthPercentageToDP(0.26),
      },
      didntreceived: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.mediumFont,
        fontSize: widthPercentageToDP(3.5),
      },
      resend: {
        color: theme.colors.primaryButton,
        fontFamily: theme.fonts.mediumFont,
        fontSize: widthPercentageToDP(3.5),
        paddingLeft: widthPercentageToDP(1.7),
      },
    });
  return React.useMemo(() => styles(), []);
};
