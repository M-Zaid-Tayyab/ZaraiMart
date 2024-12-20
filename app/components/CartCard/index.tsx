import React from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import FastImage from "@d11/react-native-fast-image";
import {useTheme} from 'react-native-paper';
import images from '../../config/images';
import {useStyle} from './style';
import {Props} from './types';
const CartCard: React.FC<Props> = props => {
  const styles = useStyle();
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={props?.onItemPress} style={[styles.view, props.style]}>
      <View style={styles.rowContainer}>
        <FastImage
          source={props?.imageUrl}
          style={styles.cropImage}
          resizeMode="stretch"
        />
        <View style={styles.txtContainer}>
          <Text style={styles.nameText}>{props?.cropName}</Text>
          <Text style={styles.priceText}>Rs {props?.price}/kg</Text>
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
            <View style={styles.greyContainer}>
              <Text style={styles.qtText}>{props?.quantity} Kg</Text>
            </View>
            {props?.editable && (
              <Pressable onPress={props?.onPress}>
                <FastImage
                  source={images.Cart.delete}
                  style={styles.deleteImage}
                  resizeMode="contain"
                />
              </Pressable>
            )}
            {props?.checkout && (
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={props?.onPress}>
                <Text style={styles.buttonText}>Checkout</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default CartCard;
