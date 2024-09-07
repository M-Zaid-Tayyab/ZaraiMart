import React, {useState} from 'react';
import {
  I18nManager,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {useTheme} from 'react-native-paper';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useStyle} from './style';
import {Props} from './types';
import images from '../../config/images';
import FastImage from 'react-native-fast-image';
const InputBoxWithIcon: React.FC<Props> = props => {
  const styles = useStyle();
  const [isFocused, setIsFocused] = useState(false);
  const [isPaswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const theme = useTheme();

  const togglePassword = () => {
    setIsPasswordVisible((prev: boolean) => !prev);
  };
  const clear = () => {
    props.onChangeText('');
    setTimeout(() => {
      props?.onBlur ? props?.onBlur() : null;
    }, 1000);
  };

  const ValidateEmail = (email: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }

    return false;
  };

  const ValidatePassword = (email: string) => {
    if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(email)) {
      return true;
    }

    return false;
  };

  const onTextChange = (text: string) => {
    if (!props.disabled) {
      props.onChangeText(text);
      if (props.showError) {
        if (props.error) {
          if (props.type === 'email') {
            if (ValidateEmail(text)) {
              props.error(false);
              setErrorMessage('');
            } else {
              props.error(true);
              setErrorMessage('Please enter a valid email address');
            }
          } else if (props.type === 'password') {
            if (ValidatePassword(text)) {
              props.error(false);
              setErrorMessage('');
            } else {
              props.error(true);
              setErrorMessage(
                'Password must contain 6-20 character with at least one numeric digit and one special character',
              );
            }
          } else {
            props.error(false);
            setErrorMessage('');
          }
        }
      }
    }
  };
  const getFontStyle = () => {
    if (props?.value?.length > 0) {
      return theme.fonts.semiBoldFont;
    } else {
      return styles.regularFont;
    }
  };
  return (
    <>
      <View
        style={[
          styles.textView,
          {
            width: props?.width ? props.width : widthPercentageToDP(94),
          },
          props.style,
        ]}
        onLayout={props?.onLayout}>
        {props.renderIcon != null ? props.renderIcon() : null}
        {props.disabled ? (
          <Text
            style={[
              styles.input,
              {
                maxWidth: props?.width
                  ? props?.width - widthPercentageToDP(8)
                  : widthPercentageToDP(67),
                includeFontPadding: false,
                color: 'grey',
                textAlign: 'left',
              },
            ]}>
            {props?.value}
          </Text>
        ) : (
          <TextInput
            onChangeText={val => {
              const cleanNumber = val.replace(/[^0-9]/g, '');
              onTextChange(
                props?.keyboardType == 'dialpad' ? cleanNumber : val,
              );
            }}
            value={props.value}
            multiline={props?.multiline ? true : false}
            style={[
              styles.input,
              {
                color: theme.colors.primaryText,
                width: props?.width
                  ? props?.width - widthPercentageToDP(8)
                  : widthPercentageToDP(67),
                includeFontPadding: false,
                // fontFamily: getFontStyle(),
                // marginTop: heightPercentageToDP(0.4),
              },
              props?.inputStyle,
            ]}
            placeholderTextColor={theme.colors.placeholderText}
            onFocus={() => {
              if (!props.disabled) setIsFocused(true);
            }}
            maxLength={props?.numberOfCharacter}
            keyboardType={
              props.keyboardType === 'dialpad' ? 'phone-pad' : 'default'
            }
            onBlur={() => {
              setIsFocused(false);
              setTimeout(() => {
                props?.onBlur ? props?.onBlur() : null;
              }, 1000);
            }}
            autoCapitalize="none"
            placeholder={props.placeholder}
            textAlign={I18nManager.isRTL ? 'right' : 'left'}
            autoCorrect={false}
            scrollEnabled
            secureTextEntry={
              props.type == 'password' && !isPaswordVisible ? true : false
            }
          />
        )}
        {props.type === 'password' && (
          <TouchableOpacity onPress={togglePassword} style={styles.eye}>
            <FastImage
              source={
                isPaswordVisible ? images.SignUp.eye : images.SignUp.eyeCrossed
              }
              style={styles.icons}
              resizeMode="contain"
              tintColor={theme.colors.placeholderText}
            />
          </TouchableOpacity>
        )}
        {props.rightIcon && (
          <FastImage
            source={props?.rightIcon}
            style={styles.rightIcon}
            resizeMode="contain"
          />
        )}
      </View>
      {errorMessage != '' && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </>
  );
};

export default InputBoxWithIcon;
