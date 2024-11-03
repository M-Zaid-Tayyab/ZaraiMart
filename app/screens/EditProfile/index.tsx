import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  widthPercentageToDP
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import InputBoxWithIcon from '../../components/InputBoxWithIcon';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import { enableSnackbar } from '../../redux/slices/snackbarSlice';
import { saveUser } from '../../redux/slices/userSlice';
import { formateErrorMessage } from '../../utils/helperFunctions';
import { useStyle } from './styles';
const EditProfile: React.FC = () => {
  const styles = useStyle();
  const user = useSelector(state => state.userReducer.user);
  const theme = useTheme();
  const [fullName, setFullName] = useState('');
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);
  const {control, handleSubmit, formState, watch, setValue} = useForm();
  const dispatch = useDispatch();
  const handleUpdateProfile = async (data: any) => {
    if (
      (user?.name == data?.name || !data?.name) &&
      (user?.phone == data?.phone || !data?.phone)
    ) {
      console.log("Returning")
      return;
    }
    try {
      setIsLoading(true)
      const userRef = firestore().collection('users').doc(user?.uid);
      const payload = {};
      if (user?.name != data?.name && data?.name) payload['name'] = data?.name;
      if (user?.phone != data?.phone && data?.phone)
        payload['phone'] = data?.phone;
      await userRef.update(payload);
      const updatedUser = (await userRef.get()).data();
      const {createdAt, ...restUpdatedData} = updatedUser;
      dispatch(
        saveUser({
          ...user,
          ...restUpdatedData,
          uid: user.uid,
        }),
      );
      navigation.goBack();
    } catch (error) {
      console.log(error)
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    }
    finally{
      setIsLoading(false)
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Header title="Edit Profile" style={styles.header} />
        <View>
          <Controller
            control={control}
            defaultValue={user?.name}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <InputBoxWithIcon
                onChangeText={onChange}
                inputStyle={styles.inputStyle}
                style={{width: widthPercentageToDP(94)}}
                numberOfCharacter={30}
                value={value}
                placeholder="Full Name"
              />
            )}
            name="name"
          />

          {formState.errors.name && (
            <Text
              style={[
                styles.error,
                {maxWidth: widthPercentageToDP(43)},
              ]}>
              Name is required
            </Text>
          )}
        </View>
        <View style={styles.controller}>
          <Controller
            control={control}
            defaultValue={user?.email}
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
                style={{width: widthPercentageToDP(94)}}
                value={value}
                inputStyle={styles.inputStyle}
                showError={!!formState.errors.email}
                placeholder="Email"
                editable={false}
                
                rightIcon={images.EditProfile.message}
              />
            )}
            name="email"
          />
          {formState.errors.email && (
            <Text
              style={[
                styles.error,
                {maxWidth: widthPercentageToDP(43)},
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
            defaultValue={user?.phone}
            rules={{
              required: 'Phone is required',
              minLength: {
                value: 11,
                message: 'Phone number must be 11 characters',
              },
            }}
            render={({field: {onChange, value}}) => (
              <InputBoxWithIcon
                onChangeText={onChange}
                numberOfCharacter={11}
                value={value}
                style={{width: widthPercentageToDP(94)}}
                inputStyle={styles.inputStyle}
                placeholder="Phone Number"
                keyboardType="dialpad"
              />
            )}
            name="phone"
          />

          {formState.errors.phone && (
            <Text
              style={[
                styles.error,
                {maxWidth: widthPercentageToDP(43)},
              ]}>
              {formState.errors.phone.type === 'required'
                ? 'Phone is required'
                : 'Phone number must be 11 characters'}
            </Text>
          )}
        </View>
      </View>
      <PrimaryButton
        title="Update"
        style={styles.button}
        disabledWhileAnimating
        onPress={handleSubmit(handleUpdateProfile)}
        animating={isLoading}
      />
    </SafeAreaView>
  );
};

export default EditProfile;
