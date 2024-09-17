import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import OrderCard from '../../components/OrderCard';
import {dummyOrderData} from '../../utils/dummyData';
import {useStyle} from './styles';
import images from '../../config/images';
const ActiveOrders: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const renderOrders = ({item}) => (
    <OrderCard
      style={styles.orderCardStyle}
      imageUrl={{uri: item?.imageUrl}}
      cropName={item?.cropName}
      price={item?.price}
      status={'active'}
      quantity={item?.quantity}
      onPress={() => {}}
      sellerName="Seller"
      sellerImg={images.Home.userPlaceholder}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <FlatList
          data={dummyOrderData}
          renderItem={renderOrders}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ActiveOrders;
