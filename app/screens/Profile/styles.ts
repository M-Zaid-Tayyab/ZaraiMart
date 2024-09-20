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
      subContainer:{
        paddingHorizontal:widthPercentageToDP(3),
      },
      infoContainer:{
        // justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
      },
      img:{
        width:widthPercentageToDP(26),
        height:widthPercentageToDP(26),
        borderRadius:widthPercentageToDP(100),
        backgroundColor:'#b1b1b1'
      },
      penIcon:{
        width:widthPercentageToDP(5),
        height:heightPercentageToDP(2.5),
      },
      penContainer:{
        position:'absolute',
        zIndex:400,
        bottom:heightPercentageToDP(0.2),
        right:widthPercentageToDP(2)
      },
      lineSeperator: {
        borderWidth: widthPercentageToDP(0.13),
        borderColor: theme.colors.borderColor,
        marginTop: heightPercentageToDP(3),
      },
      nameText:{
        fontFamily:theme.fonts.boldFont,
        fontSize:widthPercentageToDP(4.8),
        color:theme.colors.primaryText,
      },
      numberText:{
        fontFamily:theme.fonts.semiBoldFont,
        fontSize:widthPercentageToDP(3.3),
        color:theme.colors.primaryText,
      },
      rowContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:heightPercentageToDP(3),
      },
      row:{
        flexDirection:'row',
        alignItems:'center',
      },
      icon:{
        width:widthPercentageToDP(6),
        height:heightPercentageToDP(2.5),
      },
      optionText:{
        fontFamily:theme.fonts.semiBoldFont,
        fontSize:widthPercentageToDP(4),
        marginLeft:widthPercentageToDP(3),
      },
      modalView: {
        backgroundColor: theme.colors.background,
        paddingHorizontal: widthPercentageToDP(6),
        width: widthPercentageToDP(100),
        borderTopStartRadius: widthPercentageToDP(10),
        borderTopEndRadius: widthPercentageToDP(10),
        paddingBottom: heightPercentageToDP(3),
        paddingTop: heightPercentageToDP(1),
        position: 'absolute',
        bottom: 0,
      },
      topIndicator: {
        borderWidth: widthPercentageToDP(0.4),
        borderColor: theme.colors.greyDot,
        alignSelf: 'center',
        paddingHorizontal: widthPercentageToDP(5),
        marginBottom: heightPercentageToDP(2),
      },
      cancelButton:{
        backgroundColor: theme.colors.transparentGreenBackground,
        width: widthPercentageToDP(33),
      },
      submitButton:{
        width: widthPercentageToDP(40),
      },
      heading: {
        color: '#F75555',
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4.9),
        alignSelf: 'center',
      },
      secHeading: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.semiBoldFont,
        fontSize: widthPercentageToDP(4),
        alignSelf: 'center',
        marginTop:heightPercentageToDP(2),
      },
    });
  return React.useMemo(() => styles(), []);
};
