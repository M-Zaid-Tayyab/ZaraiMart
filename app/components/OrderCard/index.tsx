import React from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import images from '../../config/images';
import {useStyle} from './style';
import {Props} from './types';
import {heightPercentageToDP} from 'react-native-responsive-screen';
const OrderCard: React.FC<Props> = props => {
  const styles = useStyle();
  const theme = useTheme();

  return (
    <View style={[styles.view, props.style]}>
      <View style={styles.rowContainer}>
        <FastImage
          source={props?.imageUrl}
          style={styles.cropImage}
          resizeMode="cover"
        />
        <View style={styles.txtContainer}>
          <Text style={styles.nameText}>{props?.cropName}</Text>
          <Text style={styles.qtText}>Qty = {props?.quantity}</Text>
          <View style={styles.sellerContainer}>
            <View style={styles.row}>
              <FastImage
                source={props?.sellerImg}
                style={styles.sellerImg}
                resizeMode="contain"
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
              Rs {props?.price}/kg
            </Text>
            {props?.pending ? (
              <Pressable onPress={props?.onPress}>
                <FastImage
                  source={images.Cart.delete}
                  style={styles.cancelImg}
                  resizeMode="contain"
                />
              </Pressable>
            ) : !props?.fromModal ? props?.status!="active" ?
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={props?.onPress}>
                <Text style={styles.buttonText}>
                  {props?.status === 'active'
                    ? 'Track Order'
                    : 'Leave a review'}
                </Text>
              </TouchableOpacity>
              :
              <Text style={styles.greenText}>
                In delivery
              </Text>
             : undefined}
          </View>
        </View>
      </View>
    </View>
  );
};
export default OrderCard;
