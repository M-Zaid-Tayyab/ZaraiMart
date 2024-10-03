import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import EmptyComponent from '../../components/EmptyComponent';
import OrderCard from '../../components/OrderCard';
import images from '../../config/images';
import { enableSnackbar } from '../../redux/slices/snackbarSlice';
import { formateErrorMessage } from '../../utils/helperFunctions';
import { useStyle } from './styles';
const ActiveOrders: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();
  const renderOrders = ({item}) => (
    <OrderCard
      style={styles.orderCardStyle}
      imageUrl={{uri: item?.cropData?.images?.[0]}}
      cropName={item?.cropData?.title}
      price={item?.price}
      status={'active'}
      rightIcn={item?.sellerId==user?.uid ? images.Order.pen:undefined}
      onRightIcnPress={()=>{}}
      quantity={item?.quantity}
      onPress={() => {}}
      sellerName={item?.seller?.name}
      sellerImg={
        item?.seller?.profileUrl
          ? {uri: item?.seller?.profileUrl}
          : images.Home.userPlaceholder
      }
    />
  );
  const getActiveOrders = async () => {
    try {
      setIsLoading(true);
      const ordersSnapshot = await firestore()
        .collection('orders')
        .where('status', '==', 'Active')
        .get();
      const activeOrders = [];
      for (const doc of ordersSnapshot.docs) {
        const orderData = doc.data();
        if (
          orderData?.buyerId == user?.uid ||
          orderData?.sellerId == user?.uid
        ) {
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
          activeOrders.push({
            orderId: doc.id,
            ...orderData,
            seller: sellerData,
            cropData: cropData,
          });
        }
      }
      setOrders(activeOrders);
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) getActiveOrders();
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        {isLoading ? (
          <ActivityIndicator
            color={theme.colors.primaryButton}
            style={{
              alignSelf: 'center',
              marginTop: heightPercentageToDP(1),
            }}
            size={
              Platform.OS == 'ios' ? 'large' : widthPercentageToDP(11)
            }></ActivityIndicator>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrders}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={EmptyComponent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ActiveOrders;
