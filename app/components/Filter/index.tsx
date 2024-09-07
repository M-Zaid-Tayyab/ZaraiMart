import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import images from '../../config/images';
import { useStyle } from './style';
import { Props } from './types';
const Filter: React.FC<Props> = props => {
  const styles = useStyle();
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={props?.onPress} style={[props?.style]}>
      <View
        style={[
          props?.isSelected
            ? {backgroundColor: theme.colors.primaryButton}
            : {backgroundColor: 'white'},
          styles.greenContainer,
        ]}>
        <View style={styles.rowContainer}>
          {props?.reviewFilter ? (
            <FastImage
              style={styles.star}
              resizeMode="contain"
              source={
                props?.isSelected ? images.Review.whiteStar : images.Review.greenStar
              }
            />
          ) : null}
          <Text
            style={[
              props?.isSelected
                ? {color: 'white'}
                : {color: theme.colors.primaryButton},
              styles.nameText,
            ]}>
            {props?.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Filter;
