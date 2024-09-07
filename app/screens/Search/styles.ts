import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
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
      modalView: {
        backgroundColor: theme.colors.background,
        paddingHorizontal: widthPercentageToDP(3),
        borderTopStartRadius: widthPercentageToDP(10),
        borderTopEndRadius: widthPercentageToDP(10),
        paddingBottom: heightPercentageToDP(3),
        paddingTop:heightPercentageToDP(1),
        position: 'absolute',
        bottom: 0,
      },
      topIndicator:{
        borderWidth:widthPercentageToDP(0.4),
        borderColor:theme.colors.greyDot,
        alignSelf:'center',
        paddingHorizontal:widthPercentageToDP(5),
        marginBottom:heightPercentageToDP(2)
      },
      subContainer: {
        paddingHorizontal: widthPercentageToDP(3),
      },
      notFoundContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: heightPercentageToDP(16),
      },
      noFoundImg: {
        width: widthPercentageToDP(60),
        height: heightPercentageToDP(27),
      },
      notFoundText: {
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.primaryText,
        fontSize: widthPercentageToDP(6),
        marginTop: heightPercentageToDP(3),
        marginBottom: heightPercentageToDP(1),
      },
      notFoundDescription: {
        fontFamily: theme.fonts.regularFont,
        color: theme.colors.primaryText,
        fontSize: widthPercentageToDP(4),
        textAlign: 'center',
        width: widthPercentageToDP(75),
      },
      resultText: {
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.primaryText,
        fontSize: widthPercentageToDP(4.5),
      },
      queryText: {
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.primaryButton,
        fontSize: widthPercentageToDP(4.5),
      },
      rowContainer: {
        marginTop: heightPercentageToDP(2),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      resultTextContainer: {
        alignItems: 'center',
        flexDirection: 'row',
      },
      itemText: {
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.primaryButton,
        fontSize: widthPercentageToDP(3.8),
      },
      sortText: {
        alignSelf: 'center',
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.primaryText,
        fontSize: widthPercentageToDP(5),
      },
      lineSeperator: {
        backgroundColor: theme.colors.borderColor,
        paddingVertical: heightPercentageToDP(0.065),
        marginVertical: heightPercentageToDP(2),
      },
      headingText: {
        marginVertical: heightPercentageToDP(2),
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.primaryText,
        fontSize: widthPercentageToDP(4),
      },
      resetButton: {
        backgroundColor: theme.colors.transparentGreenBackground,
        width: widthPercentageToDP(35),
      },
      applyButton: {
        width: widthPercentageToDP(45),
      },
      buttonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      trackStyle:{
        backgroundColor:theme.colors.borderColor,
      },
      recentText:{
        fontFamily:theme.fonts.mediumFont,
        color:theme.colors.lightGrey,
        fontSize:widthPercentageToDP(4.3),
      },
      recentContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical:heightPercentageToDP(1.5),
      },
      removeImg:{
        height: heightPercentageToDP(3),
        width: widthPercentageToDP(5.5),
      },
    });
  return React.useMemo(() => styles(), []);
};
