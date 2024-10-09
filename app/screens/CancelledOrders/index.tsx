import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import EmptyComponent from '../../components/EmptyComponent';
import OrderCard from '../../components/OrderCard';
import images from '../../config/images';
import {enableSnackbar} from '../../redux/slices/snackbarSlice';
import {formateErrorMessage} from '../../utils/helperFunctions';
import {useStyle} from './styles';
const CancelledOrders: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();
  const renderOrders = ({item}) => {
    const timestamp = new Date((item?.cancelledAt.seconds * 1000) + (item?.cancelledAt.nanoseconds / 1000000));
const dateString = timestamp.toISOString().split('T')[0]; 
const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
const formattedDate = timestamp.toLocaleDateString(undefined, options);
    return (
      <OrderCard
        style={styles.orderCardStyle}
        imageUrl={{uri: item?.cropData?.images?.[0]}}
        cropName={item?.cropData?.title}
        price={item?.price}
        status='cancelled'
        quantity={item?.quantity}
        sellerName={item?.seller?.name}
        date={formattedDate}
        sellerImg={
          item?.seller?.profileUrl
            ? {uri: item?.seller?.profileUrl}
            : images.Home.userPlaceholder
        }
      />
    );
  };
  const getCancelledOrders = async () => {
    try {
      setIsLoading(true);
      const ordersSnapshot = await firestore()
        .collection('orders')
        .where('status', '==', 'Cancelled')
        .get();
      const cancelledOrders = [];
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
          cancelledOrders.push({
            orderId: doc.id,
            ...orderData,
            seller: sellerData,
            cropData: cropData,
          });
        }
      }
      setOrders(cancelledOrders);
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) getCancelledOrders();
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

export default CancelledOrders;
