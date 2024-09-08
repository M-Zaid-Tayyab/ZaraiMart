import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import AddressCard from '../../components/AddressCard';
import CartCard from '../../components/CartCard';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import { dummyOrderData } from '../../utils/dummyData';
import { useStyle } from './styles';
const Checkout: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.addressText}>Shipping Address</Text>
        <AddressCard
          leftIcon={images.Address.location}
          title="Apartment"
          address="21833 Clyde Gallagher, PC 4662"
          rightIcon={images.Address.edit}
          style={{marginTop: heightPercentageToDP(2)}}
          onPress={() => {
            navigation.navigate('Shipping Address');
          }}
        />
        <View style={styles.lineSeperator}></View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.addressText}>Order List</Text>
          {dummyOrderData.map((item, index) => (
            <CartCard
              key={index}
              style={styles.orderCardStyle}
              imageUrl={{uri: item?.imageUrl}}
              cropName={item?.cropName}
              price={item?.price}
              quantity={item?.quantity}
              onPress={toggleModal}
            />
          ))}
          <View style={styles.lineSeperator}></View>
          <View style={styles.priceContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.amountText}>Total</Text>
              <Text style={styles.totalText}>Rs18000</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonTop}></View>
      <PrimaryButton
        style={styles.button}
        title="Continue to Payment"
        onPress={() => navigation.navigate("Pay Now")}
      />
    </SafeAreaView>
  );
};

export default Checkout;
