import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import FastImage from "@d11/react-native-fast-image";
import Modal from 'react-native-modal';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating-widget';
import {useDispatch, useSelector} from 'react-redux';
import EmptyComponent from '../../components/EmptyComponent';
import InputBoxWithIcon from '../../components/InputBoxWithIcon';
import OrderCard from '../../components/OrderCard';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import {enableSnackbar} from '../../redux/slices/snackbarSlice';
import {formateErrorMessage} from '../../utils/helperFunctions';
import {useStyle} from './styles';
const CompletedOrders: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const isFocused = useIsFocused();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(state => state.userReducer.user);
  const [selectedItem, setSelectedItem] = useState();
  const dispatch = useDispatch();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const renderOrders = ({item}) => {
    const otherUserId =
      item?.buyerId !== user?.uid ? item?.buyerId : item?.sellerId;
    return(
    <OrderCard
      style={styles.orderCardStyle}
      imageUrl={{uri: item?.cropData?.images?.[0]}}
      cropName={item?.cropData?.title}
      price={item?.price}
      status={'completed'}
      quantity={item?.quantity}
      rating={item?.review?.rating}
      onSellerPress={() =>
        navigation.navigate('Chat', {otherUserId: otherUserId})
      }
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
  )};
  const getCompletedOrders = async () => {
    try {
      // setIsLoading(true);
      const ordersSnapshot = await firestore()
        .collection('orders')
        .where('status', '==', 'Completed')
        .get();
      const completedOrders = [];
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
          completedOrders.push({
            orderId: doc.id,
            ...orderData,
            seller: sellerData,
            cropData: cropData,
          });
        }
      }
      setOrders(completedOrders);
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) getCompletedOrders();
  }, [isFocused]);
  const handleSaveReview = async () => {
    try {
      const reviewData = {
        rating: rating,
        reviewText: review,
        createdAt: firestore.FieldValue.serverTimestamp(),
        userId:user?.uid,
      };
      const reviewsRef = firestore()
        .collection('crops')
        .doc(selectedItem?.cropId)
        .collection('reviews');
      const orderRef = firestore()
        .collection('orders')
        .doc(selectedItem?.orderId);
      await reviewsRef.add(reviewData);
      await orderRef.update({
        review: reviewData,
      });
      console.log('Review saved successfully');
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving review: ', error);
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    }
  };

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
        <Modal
          isVisible={isModalVisible}
          onBackButtonPress={toggleModal}
          onBackdropPress={toggleModal}
          style={{margin: 0}}>
          <View style={styles.modalView}>
            <View style={styles.topIndicator}></View>
            <Text style={styles.reviewHeading}>Leave a Review</Text>
            <View style={styles.lineSeperator}></View>
            <OrderCard
              style={styles.orderCardStyle}
              imageUrl={{uri: selectedItem?.cropData?.images?.[0]}}
              cropName={selectedItem?.cropData?.title}
              price={selectedItem?.price}
              status={'completed'}
              quantity={selectedItem?.quantity}
              sellerName={selectedItem?.seller?.name}
              sellerImg={
                selectedItem?.seller?.profileUrl
                  ? {uri: selectedItem?.seller?.profileUrl}
                  : images.Home.userPlaceholder
              }
              fromModal
            />
            <View style={styles.lineSeperator}></View>
            <Text style={styles.secHeading}>How was your order?</Text>
            <Text style={styles.reviewSubHeading}>
              Please give your rating & also your review...
            </Text>
            <StarRating
              rating={rating}
              enableHalfStar={false}
              emptyColor="black"
              style={{
                alignSelf: 'center',
                marginVertical: heightPercentageToDP(1),
              }}
              onChange={setRating}
              StarIconComponent={({type}) => (
                <FastImage
                  source={
                    type === 'full'
                      ? images.Order.greenStar
                      : images.Order.ratingStar
                  }
                  resizeMode="stretch"
                  style={styles.starImg}
                />
              )}
            />
            <InputBoxWithIcon
              inputStyle={{
                paddingVertical: heightPercentageToDP(1.3),
                width: widthPercentageToDP(83),
              }}
              onChangeText={txt => setReview(txt)}
              value={review}
              numberOfCharacter={200}
              style={{marginTop: heightPercentageToDP(2)}}
              placeholder="Review..."
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
                title="Submit"
                onPress={handleSaveReview}
                style={styles.submitButton}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default CompletedOrders;
