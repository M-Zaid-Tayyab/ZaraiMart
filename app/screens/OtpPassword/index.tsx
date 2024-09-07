import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {SafeAreaView, Text, View} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import {useTheme} from 'react-native-paper';
import PrimaryButton from '../../components/PrimaryButton';
import {useStyle} from './styles';
import images from '../../config/images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../components/Header';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const OtpPassword: React.FC = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const styles = useStyle();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute<any>();

  useEffect(() => {
    if (otp?.length > 3) {
      verifyOtpForReset();
    }
  }, [otp]);

  const verifyOtpForReset = () => {
    navigation.navigate('Create New Password');
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <SafeAreaView>
        <View style={styles.subContainer}>
          <Text style={styles.text2}>
            Enter OTP sent to your email for the verification process.
          </Text>
          <OTPTextInput
            containerStyle={styles.containerStyle}
            inputCount={4}
            tintColor={theme.colors.primaryButton}
            offTintColor={theme.colors.borderColor}
            textInputStyle={styles.otpTextInput}
            textContentType={'oneTimeCode'}
            keyboardType="numeric"
            handleTextChange={setOtp}
          />
          <View style={styles.resendContainer}>
            <Text style={styles.didntreceived}>
              If you don’t recieve a code!
            </Text>
            <TouchableOpacity>
              <Text style={styles.resend}>Resend it</Text>
            </TouchableOpacity>
          </View>
          <PrimaryButton
            style={styles.button}
            title="Verify"
            animating={isLoading}
            disabledWhileAnimating
            onPress={verifyOtpForReset}
            disabled={otp?.length < 4 ? true : false}
          />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default OtpPassword;
