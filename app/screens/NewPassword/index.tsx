import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Text, View, TouchableOpacity, Modal, SafeAreaView} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from 'react-native-paper';
import Header from '../../components/Header';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import InputBoxWithIcon from '../../components/InputBoxWithIcon';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import {useStyle} from './styles';
import {ScrollView} from 'react-native-gesture-handler';
const NewPassword: React.FC = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const styles = useStyle();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {control, handleSubmit, setValue, watch, formState, getValues} =
    useForm();
  const updatePassword = (newPassword: string) => {
    setValue('password', newPassword);
  };
  const watchedPassword = watch('password');
  const resetPassword = () => {
    setModalVisible(() => !modalVisible);
  };
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="always"
      style={styles.container}>
      {modalVisible && <View style={styles.overlay}></View>}
      <SafeAreaView style={styles.subContainer}>
        <FastImage
          source={images.ForgotPassword.newPassword}
          resizeMode="contain"
          style={styles.Img}
        />
        <Text style={styles.text}>Create Your New Password</Text>
        <View style={styles.controller}>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 8,
                message: 'Password must contain 8 characters',
              },
            }}
            render={({field: {onChange, value}}) => (
              <InputBoxWithIcon
                onChangeText={text => {
                  onChange(text);
                  updatePassword(text);
                }}
                numberOfCharacter={30}
                value={value}
                style={{width: widthPercentageToDP(94)}}
                placeholder="Password"
                type="password"
                renderIcon={() => (
                  <FastImage
                    source={images.SignUp.lock}
                    style={styles.icons}
                    resizeMode="contain"
                    tintColor={theme.colors.placeholderText}
                  />
                )}
              />
            )}
            name="password"
          />

          {formState.errors.password && (
            <Text
              style={[
                styles.error,
                {maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end'},
              ]}>
              {formState.errors.password.type == 'required'
                ? 'Password is required'
                : 'Password must contain 8 characters'}
            </Text>
          )}
        </View>
        <View style={styles.controller}>
          <Controller
            control={control}
            rules={{
              required: 'Confirm Password is required',
              validate: value =>
                value === watchedPassword || 'Passwords do not match',
            }}
            render={({field: {onChange, value}}) => (
              <InputBoxWithIcon
                onChangeText={onChange}
                numberOfCharacter={30}
                value={value}
                style={{width: widthPercentageToDP(94)}}
                placeholder="Confirm Password"
                type="password"
                renderIcon={() => (
                  <FastImage
                    source={images.SignUp.lock}
                    style={styles.icons}
                    resizeMode="contain"
                    tintColor={theme.colors.placeholderText}
                  />
                )}
              />
            )}
            name="confirmPassword"
          />
          {formState.errors.confirmPassword && (
            <Text
              style={[
                styles.error,
                {maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end'},
              ]}>
              {formState.errors.confirmPassword.message}
            </Text>
          )}
        </View>
        <BouncyCheckbox
          size={20}
          unfillColor="transparent"
          fillColor={theme.colors.primaryButton}
          text="Remember me"
          useNativeDriver
          iconStyle={styles.iconStyle}
          style={{
            marginVertical: heightPercentageToDP(2),
            alignSelf: 'center',
          }}
          textStyle={styles.checkBoxText}
          isChecked={rememberMe}
          onPress={(isChecked: boolean) => {
            setRememberMe(isChecked);
          }}
        />
        <PrimaryButton
          style={styles.button}
          title="Continue"
          disabledWhileAnimating
          animating={isLoading}
          onPress={handleSubmit(resetPassword)}
        />
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <FastImage
            source={images.ForgotPassword.success}
            resizeMode="contain"
            style={styles.successImg}
          />
          <Text style={styles.congratsText}>Congratulations!</Text>
          <Text style={styles.congratsSubText}>
            Your account is ready to use. You will be redirected to the Home
            page in a{' '}
          </Text>
          <Text style={styles.congratsSubText}>few seconds..</Text>
          <FastImage
            source={images.ForgotPassword.loader}
            resizeMode="contain"
            style={styles.loaderImg}
          />
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
};

export default NewPassword;
