import React from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import images from '../../config/images';
import {useStyle} from './style';
import {Props} from './types';
const CartCard: React.FC<Props> = props => {
  const styles = useStyle();
  const theme = useTheme();

  return (
    <View style={[styles.view, props.style]}>
      <View style={styles.rowContainer}>
        <FastImage
          source={props?.imageUrl}
          style={styles.cropImage}
          resizeMode="stretch"
        />
        <View style={styles.txtContainer}>
          <Text style={styles.nameText}>{props?.cropName}</Text>
          <Text style={styles.priceText}>Rs {props?.price}/kg</Text>
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
          </View>
        </View>
      </View>
    </View>
  );
};
export default CartCard;
