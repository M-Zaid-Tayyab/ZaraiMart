import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, SafeAreaView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from 'react-native-paper';
import {
  widthPercentageToDP
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import InputBoxWithIcon from '../../components/InputBoxWithIcon';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import { useStyle } from './styles';
const ForgotPassword: React.FC = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const styles = useStyle();
  const [isLoading, setIsLoading] = useState(false);
  const {control, handleSubmit, reset, trigger, formState, getValues} =
    useForm();

  const forgetPassword = () => {
    Keyboard.dismiss();
    navigation.navigate('One Time Password');
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="always">
      <SafeAreaView style={styles.subContainer}>
        <FastImage
          source={images.ForgotPassword.sittingPerson}
          resizeMode="contain"
          style={styles.Img}
        />
        <Text style={styles.text}>
          Enter your email so that we can send you an otp code to reset your
          password.
        </Text>
        <View style={styles.controller}>
          <Controller
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Invalid email address',
              },
            }}
            render={({field: {onChange, value}}) => (
              <InputBoxWithIcon
                onChangeText={onChange}
                numberOfCharacter={30}
                value={value}
                style={{width:widthPercentageToDP(94)}}
                placeholder="Email"
                renderIcon={() => (
                  <FastImage
                    source={images.SignUp.email}
                    style={styles.icons}
                    resizeMode="contain"
                    tintColor={theme.colors.placeholderText}
                  />
                )}
              />
            )}
            name="email"
          />
          {formState.errors.email && (
            <Text
              style={[
                styles.error,
                {maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end'},
              ]}>
              {formState.errors.email.type === 'pattern'
                ? 'Invalid email address'
                : 'Email is required'}
            </Text>
          )}
        </View>
        <PrimaryButton
          style={styles.button}
          title="Send"
          disabledWhileAnimating
          animating={isLoading}
          onPress={handleSubmit(forgetPassword)}
        />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPassword;
