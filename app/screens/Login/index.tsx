import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import InputBoxWithIcon from '../../components/InputBoxWithIcon';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import {enableSnackbar} from '../../redux/slices/snackbarSlice';
import {useStyle} from './styles';
import {formateErrorMessage} from '../../utils/helperFunctions';
import {saveUser} from '../../redux/slices/userSlice';
import firestore from '@react-native-firebase/firestore';
const Login: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const {control, handleSubmit, reset, trigger, formState, getValues} =
    useForm();
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const login = async (data?: any) => {
    try {
      setIsLoading(true);
      const userCredential = await auth().signInWithEmailAndPassword(
        data?.email,
        data?.password,
      );
      const user = userCredential.user;
      if (!user.emailVerified) {
        dispatch(enableSnackbar('Please verify your email to sign in'));
        return;
      }
      const userDocRef = firestore().collection('users').doc(user.uid);
      const userDoc = await userDocRef.get();
      const userInfo = userDoc.data();
      const userPayload = {
        uid: user.uid,
        email: userInfo?.email,
        name: userInfo?.name,
        phone: userInfo?.phone,
        profileUrl: userInfo?.profileUrl,
      };
      dispatch(saveUser(userPayload));
      navigation.navigate('Main');
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <FastImage
        source={images.SignUp.logo}
        resizeMode="contain"
        style={styles.logo}
      />

      <Text style={styles.heading}>Sign In</Text>
      <Text style={styles.text}>Enter details to continue</Text>
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
              onChangeText={onChange}
              numberOfCharacter={30}
              value={value}
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
      <PrimaryButton
        title="Sign in"
        style={{marginTop: heightPercentageToDP(3)}}
        disabledWhileAnimating
        onPress={handleSubmit(login)}
        animating={isLoading}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
        <Text
          style={[
            {
              marginVertical: heightPercentageToDP(3),
              color: theme.colors.primaryButton,
              fontFamily: theme.fonts.semiBoldFont,
            },
          ]}>
          Forgot the Password?
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={[
            {
              marginVertical: heightPercentageToDP(2),
              color: theme.colors.placeholderText,
              alignSelf: 'center',
            },
          ]}>
          Don’t have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text
            style={[
              {
                marginVertical: heightPercentageToDP(2),
                color: theme.colors.primaryButton,
                fontFamily: theme.fonts.semiBoldFont,
              },
            ]}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
