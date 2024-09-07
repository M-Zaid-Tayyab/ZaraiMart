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
      image: {
        height: heightPercentageToDP(60),
        marginBottom: heightPercentageToDP(2),
        width:widthPercentageToDP(100),
      },
      imageContainer:{
        flex:1
      },
      heading: {
        alignSelf: 'center',
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(7.7),
        width:widthPercentageToDP(80),
        paddingHorizontal: widthPercentageToDP(4),
        textAlign:'center'
      },
      dotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:heightPercentageToDP(4),
        alignSelf: 'center',
      },
      longDot: {
        paddingHorizontal: widthPercentageToDP(2.7),
        paddingVertical: heightPercentageToDP(0.4),
        borderRadius: widthPercentageToDP(3),
        backgroundColor: theme.colors.primaryButton,
        marginHorizontal: widthPercentageToDP(0.3),
      },
      shortDot: {
        marginHorizontal: widthPercentageToDP(0.3),
        paddingHorizontal: widthPercentageToDP(1),
        paddingVertical: heightPercentageToDP(0.4),
        borderRadius: widthPercentageToDP(3),
        backgroundColor: theme.colors.greyDot,
      },
      button: {
        marginTop:heightPercentageToDP(9),
        borderRadius:widthPercentageToDP(80),
        bottom:widthPercentageToDP(10),
        alignSelf: 'center',
      },
    });
  return React.useMemo(() => styles(), []);
};
