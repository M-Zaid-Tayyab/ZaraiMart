import React from 'react';
import { StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
export const useStyle = () => {
  const theme = useTheme();
  const styles = () =>
    StyleSheet.create({
      view: {
        backgroundColor: theme.colors.background,
        borderRadius: widthPercentageToDP(4),
        paddingHorizontal: widthPercentageToDP(3),
        paddingVertical: heightPercentageToDP(2),
      },
      flexrow: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'
      },
      rowContainer:{
        flexDirection: 'row',
        alignItems:'center'
      },
      txtContainer:{
        flex:1,
        marginLeft:heightPercentageToDP(2),
      },
      cropImage: {
        borderRadius:widthPercentageToDP(6),
        width:widthPercentageToDP(28),
        height:heightPercentageToDP(13)
      },
      deleteImage: {
        width:widthPercentageToDP(6),
        height:heightPercentageToDP(3)
      },
      nameText: {
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.primaryText,
        fontSize: widthPercentageToDP(4.6),
      },
      priceText: {
        fontFamily: theme.fonts.boldFont,
        color: theme.colors.primaryButton,
        fontSize: widthPercentageToDP(4.4),
        marginVertical:heightPercentageToDP(0.6),
      },
      qtText: {
        fontFamily: theme.fonts.semiBoldFont,
        color: theme.colors.primaryButton,
        fontSize: widthPercentageToDP(3.5),
      },
      greyContainer:{
        paddingHorizontal: widthPercentageToDP(5),
        paddingVertical: heightPercentageToDP(0.6),
        borderRadius: widthPercentageToDP(5),
        backgroundColor: theme.colors.dullGreyBackground,
      },
      buttonContainer:{
        paddingHorizontal:widthPercentageToDP(3),
        paddingVertical:heightPercentageToDP(1),
        backgroundColor:theme.colors.primaryButton,
        borderRadius:widthPercentageToDP(6),
      },
      buttonText:{
        color:'white',
        fontFamily:theme.fonts.boldFont,
        fontSize:widthPercentageToDP(3.1),
      }
    });
  return React.useMemo(() => styles(), []);
};
