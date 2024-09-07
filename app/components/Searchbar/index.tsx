import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import images from '../../config/images';
import {useStyle} from './style';
import {Props} from './types';
const Searchbar: React.FC<Props> = props => {
  const styles = useStyle();
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
    if (props?.isFocused) props.isFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
    if (props?.isFocused) props.isFocused(false);
  };
  const textInputRef = useRef(null);
  useEffect(() => {
    textInputRef.current?.focus();
  }, []);
  return (
    <Pressable
      style={[
        isFocused
          ? {
              backgroundColor: theme.colors.transparentGreenBackground,
              borderColor: theme.colors.primaryButton,
              borderWidth: widthPercentageToDP(0.25),
            }
          : {backgroundColor: theme.colors.dullGreyBackground},
        styles.searchParent,
        props?.styles,
      ]}
      onPress={props?.onPress}>
      <View style={styles.rowFlex}>
        <View style={styles.subRowFlex}>
          <FastImage
            source={images.Home.search}
            tintColor={
              isFocused
                ? theme.colors.primaryButton
                : props?.placeholderColor
                ? props?.placeholderColor
                : theme.colors.primaryText
            }
            style={styles.searchIcon}
            resizeMode="contain"
          />
          {props?.dummy ? (
            <Pressable onPress={props?.onPress}>
              <Text
                style={[
                  styles.search,
                  {
                    // top: isTablet()
                    //   ? heightPercentageToDP(1.8)
                    //   : heightPercentageToDP(1.4),
                    color: props?.placeholderColor,
                  },
                ]}>
                {props?.placeholder}
              </Text>
            </Pressable>
          ) : (
            <TextInput
              ref={textInputRef}
              onChangeText={val => {
                props.onChangeText(val);
              }}
              style={styles.search}
              value={props?.value}
              // focusable={false}
              onPressIn={props?.onPress}
              placeholder={props?.placeholder}
              onFocus={props?.onFocus ? props?.onFocus : handleFocus}
              onBlur={handleBlur}
              onSubmitEditing={props?.onSubmitEditing}
              placeholderTextColor={
                props?.placeholderColor
                  ? props?.placeholderColor
                  : theme.colors.primaryText
              }
            />
          )}
        </View>
        {props?.rightIcon ? props.rightIcon() : null}
      </View>
      {/* <View style={styles.searchView} /> */}
    </Pressable>
  );
};
export default React.memo(Searchbar);
