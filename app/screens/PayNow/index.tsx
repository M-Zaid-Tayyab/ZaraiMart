import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import {useStyle} from './styles';
import {heightPercentageToDP, widthPercentageToDP} from 'react-native-responsive-screen';
const PayNow: React.FC = ({route}) => {
  const fromSell = route?.params?.fromSell;
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [cvv, setCvv] = useState();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <TextInput
          placeholderTextColor={theme.colors.placeholderText}
          placeholder="Enter your name"
          value={name}
          style={styles.input}
          onChangeText={text => setName(text)}
        />
        <View style={styles.rowContainer}>
          <FastImage
            source={images.PayNow.card}
            style={styles.icn}
            resizeMode="contain"
          />
          <TextInput
            placeholderTextColor={theme.colors.placeholderText}
            placeholder="Card number"
            value={cardNumber}
            keyboardType="number-pad"
            style={styles.cardInput}
            onChangeText={text => setCardNumber(text)}
          />
        </View>
        <View style={styles.spaceContainer}>
          <TextInput
            placeholderTextColor={theme.colors.placeholderText}
            placeholder="Expiry Date"
            value={expiryDate}
            keyboardType="number-pad"
            style={styles.expiryDateInput}
            onChangeText={text => setExpiryDate(text)}
          />
          <TextInput
            placeholderTextColor={theme.colors.placeholderText}
            placeholder="CVV"
            value={cvv}
            keyboardType="number-pad"
            style={styles.expiryDateInput}
            onChangeText={text => setCvv(text)}
          />
        </View>
        {!fromSell && (
          <>
            <View style={styles.lineSeperator}></View>
            <View style={styles.priceContainer}>
              <View style={styles.spaceContainer}>
                <Text style={styles.amountText}>Total</Text>
                <Text style={styles.totalText}>Rs18000</Text>
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
          onPress={() => navigation.navigate('Main')}
        />
      </View>
    </SafeAreaView>
  );
};

export default PayNow;
