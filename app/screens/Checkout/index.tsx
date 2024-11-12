import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CartCard from '../../components/CartCard';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import {dummyOrderData} from '../../utils/dummyData';
import {useStyle} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {enableSnackbar} from '../../redux/slices/snackbarSlice';
import {formateErrorMessage} from '../../utils/helperFunctions';
import EmptyComponent from '../../components/EmptyComponent';
const Checkout: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const deleteCartItem = async () => {
    try {
      setModalVisible(false);
      await firestore().collection('crops').doc(selectedItem?.orderId).delete();
      getActiveOrders();
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setModalVisible(false);
    }
  };
  const renderCarts = ({item}) => (
    <CartCard
      style={styles.orderCardStyle}
      imageUrl={{uri: item?.cropData?.images?.[0]}}
      cropName={item?.cropData?.title}
      price={item?.price}
      quantity={item?.quantity}
      editable
      onItemPress={() => {
        navigation.navigate('Pay Now', {item: item});
      }}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
      sellerName={item?.seller?.name}
      sellerImg={
        item?.seller?.profileUrl
          ? {uri: item?.seller?.profileUrl}
          : images.Home.userPlaceholder
      }
    />
  );
  const getPaymentPendingOrders = async () => {
    try {
      // setIsLoading(true);
      const ordersSnapshot = await firestore()
        .collection('orders')
        .where('status', '==', 'Payment Pending')
        .where('buyerId', '==', user?.uid)
        .get();
      const allCheckoutPendingOrders = [];
      for (const doc of ordersSnapshot.docs) {
        const orderData = doc.data();
          const cropSnapshot = await firestore()
            .collection('crops')
            .doc(orderData?.cropId)
            .get();
          const cropData = cropSnapshot.data();
          const sellerSnapshot = await firestore()
            .collection('users')
            .doc(orderData?.sellerId)
            .get();
          const sellerData = sellerSnapshot.data();
          allCheckoutPendingOrders.push({
            orderId: doc.id,
            ...orderData,
            seller: sellerData,
            cropData: cropData,
          });
      }
      setOrders(allCheckoutPendingOrders);
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) getPaymentPendingOrders();
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          color={theme.colors.primaryButton}
          size={
            Platform.OS == 'ios' ? 'large' : widthPercentageToDP(11)
          }></ActivityIndicator>
      ) : (
        <View style={styles.subContainer}>
          <FlatList
            data={orders}
            renderItem={renderCarts}
            ListEmptyComponent={EmptyComponent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        style={{margin: 0}}>
        <View style={styles.modalView}>
          <View style={styles.topIndicator}></View>
          <Text style={styles.reviewHeading}>Remove From Checkout?</Text>
          <View style={styles.lineSeperator}></View>
          <CartCard
            imageUrl={{uri: selectedItem?.cropData?.images?.[0]}}
            cropName={selectedItem?.cropData?.title}
            price={selectedItem?.price}
            quantity={selectedItem?.quantity}
            sellerName={selectedItem?.seller?.name}
            sellerImg={
              selectedItem?.seller?.profileUrl
                ? {uri: selectedItem?.seller?.profileUrl}
                : images.Home.userPlaceholder
            }
          />
          <View style={styles.lineSeperator}></View>
          <View style={styles.rowContainer}>
            <PrimaryButton
              title="Cancel"
              textStyle={{color: theme.colors.primaryButton}}
              onPress={toggleModal}
              style={styles.cancelButton}
            />
            <PrimaryButton
              title="Yes, Remove"
              onPress={deleteCartItem}
              style={styles.submitButton}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Checkout;
