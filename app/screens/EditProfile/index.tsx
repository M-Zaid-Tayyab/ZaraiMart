import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {SafeAreaView, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import InputBoxWithIcon from '../../components/InputBoxWithIcon';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import {useStyle} from './styles';
const EditProfile: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const [fullName, setFullName] = useState('');
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);
  const {control, handleSubmit, formState, watch, setValue} = useForm();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View >
          <Controller
            control={control}
            defaultValue={'Muhammad Zaid'}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <InputBoxWithIcon
                onChangeText={onChange}
                inputStyle={styles.inputStyle}
                style={{width:widthPercentageToDP(94)}}
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
                {maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end'},
              ]}>
              Name is required
            </Text>
          )}
        </View>
        <View style={styles.controller}>
          <Controller
            control={control}
            defaultValue={'zaidtayyab1@gmail.com'}
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
                style={{width:widthPercentageToDP(94)}}
                value={value}
                inputStyle={styles.inputStyle}
                showError={!!formState.errors.email}
                placeholder="Email"
                rightIcon={images.EditProfile.message}
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
            defaultValue={'03208551378'}
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
                style={{width:widthPercentageToDP(94)}}
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
                {maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end'},
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
        onPress={handleSubmit(() => {})}
        animating={isLoading}
      />
    </SafeAreaView>
  );
};

export default EditProfile;
