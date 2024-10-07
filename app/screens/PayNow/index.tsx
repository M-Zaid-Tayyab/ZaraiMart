import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, Text, TextInput, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import {useStyle} from './styles';
import {enableSnackbar} from '../../redux/slices/snackbarSlice';
import {useDispatch} from 'react-redux';
import {formateErrorMessage} from '../../utils/helperFunctions';
import LoadingModal from '../../components/LoadingModal';
import {Controller, useForm} from 'react-hook-form';
import InputBoxWithIcon from '../../components/InputBoxWithIcon';
const PayNow: React.FC = ({route}) => {
  const fromSell = route?.params?.fromSell;
  const item = route?.params?.item;
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [cvv, setCvv] = useState();
  const {control, handleSubmit, reset, trigger, formState, getValues} =
    useForm();
  const dispatch = useDispatch();
  const handlePayNow = async () => {
    const currentTime = new Date();
    const deadline = new Date(
      currentTime.getTime() + item?.deadline * 24 * 60 * 60 * 1000,
    );
    setIsLoading(true);
    const batch = firestore().batch();
    try {
      const orderRef = firestore().collection('orders').doc(item?.orderId);
      const cropRef = firestore().collection('crops').doc(item?.cropId);
      batch.update(orderRef, {
        status: 'Active',
        deadline: deadline.toISOString(),
      });
      batch.update(cropRef, {
        quantity: firestore.FieldValue.increment(-item?.quantity),
      });
      await batch.commit();
    } catch (error) {
      console.log(error);
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsLoading(false);
      navigation.navigate('Orders');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Header title="Pay Now" />
        <View style={styles.controller}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <InputBoxWithIcon
                onChangeText={onChange}
                numberOfCharacter={30}
                value={value}
                placeholder="Enter you name"
              />
            )}
            name="name"
          />

          {formState.errors.name && (
            <Text style={[styles.error, {maxWidth: widthPercentageToDP(43)}]}>
              Name is required
            </Text>
          )}
        </View>
        <View style={styles.controller}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <View style={styles.rowContainer}>
                <FastImage
                  source={images.PayNow.card}
                  style={styles.icn}
                  resizeMode="contain"
                />
                <TextInput
                  placeholderTextColor={theme.colors.placeholderText}
                  placeholder="Card number"
                  value={value}
                  keyboardType="number-pad"
                  style={styles.cardInput}
                  onChangeText={onChange}
                />
              </View>
            )}
            name="cardNumber"
          />

          {formState.errors.name && (
            <Text style={[styles.error, {maxWidth: widthPercentageToDP(43)}]}>
              Card Number is required
            </Text>
          )}
        </View>
        <View style={styles.controller}>
          <View style={styles.spaceContainer}>
            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}}) => (
                  <InputBoxWithIcon
                    onChangeText={onChange}
                    numberOfCharacter={30}
                    keyboardType="dialpad"
                    value={value}
                    width={widthPercentageToDP(44)}
                    placeholder="Expiry Date"
                  />
                )}
                name="expiryDate"
              />

              {formState.errors.expiryDate && (
                <Text
                  style={[styles.error, {maxWidth: widthPercentageToDP(43)}]}>
                  Expiry Date is required
                </Text>
              )}
            </View>
            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}}) => (
                  <InputBoxWithIcon
                    onChangeText={onChange}
                    numberOfCharacter={30}
                    keyboardType="dialpad"
                    value={value}
                    width={widthPercentageToDP(44)}
                    placeholder="CVV"
                  />
                )}
                name="cvv"
              />

              {formState.errors.expiryDate && (
                <Text
                  style={[styles.error, {maxWidth: widthPercentageToDP(43)}]}>
                  Cvv is required
                </Text>
              )}
            </View>
          </View>
        </View>
        {!fromSell && (
          <>
            <View style={styles.lineSeperator}></View>
            <View style={styles.priceContainer}>
              <View style={styles.spaceContainer}>
                <Text style={styles.amountText}>Total</Text>
                <Text style={styles.totalText}>
                  Rs {item?.price * item?.quantity}
                </Text>
              </View>
            </View>
          </>
        )}

        <PrimaryButton
          style={[
            styles.button,
            {
              marginTop: fromSell
                ? heightPercentageToDP(42)
                : heightPercentageToDP(35),
            },
          ]}
          title={fromSell ? 'Proceed' : 'Pay Now'}
          onPress={handleSubmit(handlePayNow)}
        />
      </View>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default PayNow;
