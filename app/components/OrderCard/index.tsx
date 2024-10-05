import React from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import images from '../../config/images';
import {useStyle} from './style';
import {Props} from './types';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const OrderCard: React.FC<Props> = props => {
  const styles = useStyle();
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={props?.onItemPress}
      style={[styles.view, props.style]}>
      <View style={styles.rowContainer}>
        <FastImage
          source={props?.imageUrl}
          style={styles.cropImage}
          resizeMode="stretch"
        />
        <View style={styles.txtContainer}>
          <Text style={styles.nameText}>{props?.cropName}</Text>
          <Text style={styles.qtText}>Qty = {props?.quantity}</Text>
          <View style={styles.sellerContainer}>
            <View style={styles.row}>
              <FastImage
                source={props?.sellerImg}
                style={styles.sellerImg}
                resizeMode="cover"
              />
              <Text style={styles.headingText}>{props?.sellerName}</Text>
            </View>
          </View>
          <View style={styles.flexrow}>
            <Text
              style={[
                props?.fromModal && {marginTop: heightPercentageToDP(0.5)},
                styles.priceText,
              ]}>
              Rs {props?.price}
            </Text>
            {props?.pending ? (
              <Pressable onPress={props?.onPress}>
                <FastImage
                  source={images.Cart.delete}
                  style={styles.cancelImg}
                  resizeMode="contain"
                />
              </Pressable>
            ) : !props?.fromModal ? (
              props?.status != 'active' ? (
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={props?.onPress}>
                  <Text style={styles.buttonText}>Leave a review</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.greenText}>{props?.deadline}</Text>
              )
            ) : undefined}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default OrderCard;
