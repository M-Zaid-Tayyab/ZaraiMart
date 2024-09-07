import React from 'react';
import { StyleSheet,Platform } from 'react-native';
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
      subContainer: {
        paddingTop: heightPercentageToDP(1),
        paddingHorizontal: widthPercentageToDP(3),
      },
      infoContainer: {
        marginLeft: widthPercentageToDP(2),
        flex: 1,
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: heightPercentageToDP(2),
        borderRadius: widthPercentageToDP(4),
        paddingHorizontal: widthPercentageToDP(2.5),
        paddingVertical: heightPercentageToDP(1.5),
        backgroundColor: theme.colors.dullGreyBackground,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      messageContainer: {
        marginTop: heightPercentageToDP(0.5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      leftIcon: {
        width: widthPercentageToDP(14),
        height: heightPercentageToDP(7),
      },
      titleText: {
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(4.3),
        color: theme.colors.primaryText,
      },
      greenContainer: {
        backgroundColor: theme.colors.primaryButton,
        paddingHorizontal: widthPercentageToDP(2.2),
        paddingVertical: heightPercentageToDP(0.4),
        borderRadius: widthPercentageToDP(8),
      },
      messageText: {
        fontFamily: theme.fonts.mediumFont,
        fontSize: widthPercentageToDP(3.45),
        color: theme.colors.grey700,
        width: widthPercentageToDP(50),
      },
      dateText: {
        fontFamily: theme.fonts.mediumFont,
        fontSize: widthPercentageToDP(3.45),
        color: theme.colors.grey700,
      },
      unreadText: {
        fontFamily: theme.fonts.semiBoldFont,
        fontSize: widthPercentageToDP(3.45),
        color: 'white',
      },
      FlatListContainer:{
        height:heightPercentageToDP(83),
      }
    });
  return React.useMemo(() => styles(), []);
};
