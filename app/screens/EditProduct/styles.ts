import {StyleSheet, Platform} from 'react-native';
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
      subContainer: {
        paddingTop: heightPercentageToDP(1),
        paddingHorizontal: widthPercentageToDP(3),
      },
      controller: {marginTop: heightPercentageToDP(3.5)},
      error: {
        color: 'red',
        paddingVertical: heightPercentageToDP(0.5),
        fontSize: isTablet() ? widthPercentageToDP(2) : undefined,
      },
      inputStyle: {
        paddingVertical: heightPercentageToDP(1.5),
        width: widthPercentageToDP(83),
      },
      addImg: {
        width: widthPercentageToDP(30),
        height: heightPercentageToDP(15),
        alignSelf:'center',
      },
      imgPlaceholder: {
        width: widthPercentageToDP(11),
        height: heightPercentageToDP(5.5),
      },
      removeImg: {
        width: widthPercentageToDP(4.4),
        height: heightPercentageToDP(2.5),
        position: 'absolute',
        left: heightPercentageToDP(-1.2),
        top: heightPercentageToDP(-0.8),
      },
      selectedImg: {
        width: widthPercentageToDP(16),
        height: heightPercentageToDP(8),
        borderRadius: widthPercentageToDP(3),
      },
      imgContainer: {
        backgroundColor: theme.colors.textViewBackground,
        paddingHorizontal: widthPercentageToDP(26),
        paddingVertical: heightPercentageToDP(11),
        borderRadius: widthPercentageToDP(4),
        alignSelf: 'center',
      },
      subImgContainer: {
        backgroundColor: theme.colors.textViewBackground,
        paddingHorizontal: widthPercentageToDP(3),
        paddingVertical: heightPercentageToDP(1.5),
        borderRadius: widthPercentageToDP(3),
      },
      imgTxt: {
        fontSize: widthPercentageToDP(4),
        fontFamily: theme.fonts.semiBoldFont,
        color: theme.colors.primaryText,
        alignSelf:'center',
      },
      button: {
        marginVertical: heightPercentageToDP(5),
        alignSelf: 'center',
      },
      row: {
        paddingTop: widthPercentageToDP(7),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      header:{
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(5.6),
        marginLeft:widthPercentageToDP(4),
      },
      space: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:heightPercentageToDP(0.3),
        marginBottom:heightPercentageToDP(2),
      },
      selectedImgContainer: {
        flexDirection: 'row',
      },

      dropdown: {
        marginTop:heightPercentageToDP(3.5),
        paddingVertical:heightPercentageToDP(1),
        borderColor: theme.colors.borderColor,
        borderWidth: widthPercentageToDP(0.2),
        borderRadius: widthPercentageToDP(3),
        paddingHorizontal: widthPercentageToDP(4),
        backgroundColor:theme.colors.textViewBackground,
      },
      placeholderStyle: {
        color:theme.colors.placeholderText,
        fontFamily:theme.fonts.regularFont,
        fontSize:widthPercentageToDP(3.5),
      },
      selectedTextStyle: {
        color:theme.colors.primaryText,
        fontFamily:theme.fonts.regularFont,
        fontSize:widthPercentageToDP(3.7),
      },
      iconStyle: {
        width:widthPercentageToDP(5),
        height:heightPercentageToDP(2.5),
      },
      deleteIcon: {
        width:widthPercentageToDP(5),
        height:heightPercentageToDP(2.5),
      },
      inputSearchStyle: {
        color:theme.colors.primaryText,
        fontFamily:theme.fonts.regularFont,
        fontSize:widthPercentageToDP(3.7),
        borderRadius: widthPercentageToDP(2),
      },
      containerStyle: {
        borderRadius: widthPercentageToDP(3),
        height:heightPercentageToDP(22),
      },
      unitContainerStyle:{
        borderRadius: widthPercentageToDP(3),
        height:heightPercentageToDP(29),
      },
      modalView: {
        backgroundColor: theme.colors.greyBackground,
        paddingHorizontal: widthPercentageToDP(3),
        width: widthPercentageToDP(100),
        borderTopStartRadius: widthPercentageToDP(10),
        borderTopEndRadius: widthPercentageToDP(10),
        paddingBottom: heightPercentageToDP(3),
        paddingTop: heightPercentageToDP(1),
        position: 'absolute',
        bottom: 0,
      },
      reviewHeading: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4.8),
        alignSelf: 'center',
        textAlign:'center'
      },
      subHeading: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4),
        alignSelf: 'center',
        textAlign:'center'
      },
      statusText:{
        fontFamily: theme.fonts.regularFont,
        fontSize: widthPercentageToDP(4.5),
        marginLeft:widthPercentageToDP(2)
      },
      lineSeperator: {
        borderWidth: widthPercentageToDP(0.15),
        borderColor: theme.colors.borderColor,
        marginVertical: heightPercentageToDP(2),
      },
      topIndicator: {
        borderWidth: widthPercentageToDP(0.4),
        borderColor: theme.colors.greyDot,
        alignSelf: 'center',
        paddingHorizontal: widthPercentageToDP(5),
        marginBottom: heightPercentageToDP(2),
      },
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:heightPercentageToDP(1.5)
      },
      topStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:heightPercentageToDP(3)
      },
      cancelButton: {
        backgroundColor: theme.colors.transparentGreenBackground,
        width: widthPercentageToDP(33),
      },
      submitButton: {
        width: widthPercentageToDP(40),
      },
      modelCartStyle: {
        borderRadius: widthPercentageToDP(4),
        paddingHorizontal: widthPercentageToDP(3),
        paddingVertical: heightPercentageToDP(2),
      },
      outerCircle:{
        paddingHorizontal:widthPercentageToDP(1.8),
        paddingVertical:heightPercentageToDP(0.9),
        borderRadius:widthPercentageToDP(50),
        borderColor:theme.colors.primaryText,
        borderWidth:widthPercentageToDP(0.4)
      },
      innerCircle:{
        paddingHorizontal:widthPercentageToDP(1.4),
        paddingVertical:heightPercentageToDP(0.7),
        borderRadius:widthPercentageToDP(50),
        backgroundColor:theme.colors.primaryButton,
      }
    });
  return React.useMemo(() => styles(), []);
};
