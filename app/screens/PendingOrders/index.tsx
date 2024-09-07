import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, Text, View, FlatList} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useStyle} from './styles';
import OrderCard from '../../components/OrderCard';
import Modal from 'react-native-modal';
import PrimaryButton from '../../components/PrimaryButton';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {dummyOrderData} from '../../utils/dummyData';
import images from '../../config/images';
const PendingOrders: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const renderOrders = ({item}) => (
    <OrderCard
      style={styles.orderCardStyle}
      imageUrl={{uri: item?.imageUrl}}
      cropName={item?.cropName}
      price={item?.price}
      status={item?.status}
      quantity={item?.quantity}
      onPress={toggleModal}
      sellerName="Seller"
      sellerImg={images.Home.zaid}
      pending
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
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        style={{margin: 0}}>
        <View style={styles.modalView}>
          <View style={styles.topIndicator}></View>
          <Text style={styles.reviewHeading}>Cancel The Bid?</Text>
          <View style={styles.lineSeperator}></View>
          <OrderCard
            style={styles.modelCartStyle}
            imageUrl={{uri: 'https://source.unsplash.com?tomatoes'}}
            cropName="Tomatoes"
            price={parseInt((Math.random() * 10000).toFixed(2))}
            quantity={Math.floor(Math.random() * 100) + 1}
            sellerName="Zaid"
            sellerImg={images.Home.zaid}
            fromModal
          />
          <View style={styles.lineSeperator}></View>
          <View style={styles.rowContainer}>
            <PrimaryButton
              title="Discard"
              textStyle={{color: theme.colors.primaryButton}}
              onPress={toggleModal}
              style={styles.cancelButton}
            />
            <PrimaryButton
              title="Yes, Cancel"
              onPress={toggleModal}
              style={styles.submitButton}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PendingOrders;
