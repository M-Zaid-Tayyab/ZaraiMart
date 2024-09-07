import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import images from '../../config/images';
import { useStyle } from './style';
import { Props } from './types';
const CropCard: React.FC<Props> = props => {
  const styles = useStyle();
  const theme = useTheme();
  const [liked, setLiked] = useState(props?.isLiked);

  return (
    <TouchableOpacity
      onPress={props?.onPress}
      style={[styles.view, props.style]}>
      <FastImage
        source={props?.image}
        style={[
          props?.isSpecialOffer
            ? {width: widthPercentageToDP(50), height: heightPercentageToDP(25)}
            : {
                width: widthPercentageToDP(44.5),
                height: heightPercentageToDP(20),
              },
          styles.cropImage,
        ]}
        resizeMode="stretch"
      />
      <Text style={styles.nameText}>{props?.name}</Text>
      {!props?.fromProducts && (
        <View style={styles.flexrow}>
          <FastImage
            source={images.Home.star}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.ratingText}>{props?.rating}</Text>
          <FastImage
            source={images.Home.separator}
            style={styles.seperatorIcon}
            resizeMode="stretch"
          />
          <View style={styles.greenContainer}>
            <Text style={styles.soldText}>{props?.noOfSold} Sold</Text>
          </View>
        </View>
      )}

      <Text style={styles.priceText}>Rs {props?.price}/kg</Text>
    </TouchableOpacity>
  );
};
export default CropCard;
