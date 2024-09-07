import React, {useState} from 'react';
import {Pressable, SafeAreaView, Text, View, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import Header from '../../components/Header';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import {useStyle} from './styles';
import AddressCard from '../../components/AddressCard';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {addressData} from '../../utils/dummyData';
const ShippingAddress: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation();

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);

  const handleAddressCardPress = (index: number) => {
    setSelectedAddressIndex(index === selectedAddressIndex ? -1 : index);
  };

  const renderAddressCard = ({item, index}: {item: any; index: number}) => {
    return (
      <AddressCard
        leftIcon={images.Address.location}
        title={item.title}
        style={{marginBottom: heightPercentageToDP(3)}}
        address={item.address}
        rightIcon={images.Address.edit}
        selection
        isSelected={index === selectedAddressIndex}
        onPress={() => handleAddressCardPress(index)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <FlatList
          data={addressData}
          renderItem={renderAddressCard}
          keyExtractor={item => item.id}
        />
      </View>
      <PrimaryButton
        title="Apply"
        style={styles.button}
        disabledWhileAnimating
        onPress={() => {
          if (selectedAddressIndex !== -1) {
            navigation.navigate('Checkout');
          } else {
            // Inform user to select an address
          }
        }}
      />
    </SafeAreaView>
  );
};

export default ShippingAddress;
