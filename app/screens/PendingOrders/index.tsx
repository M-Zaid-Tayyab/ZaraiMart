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
import Modal from 'react-native-modal';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import OrderCard from '../../components/OrderCard';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import {dummyOrderData} from '../../utils/dummyData';
import {useStyle} from './styles';
import {enableSnackbar} from '../../redux/slices/snackbarSlice';
import {formateErrorMessage} from '../../utils/helperFunctions';
import EmptyComponent from '../../components/EmptyComponent';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import LoadingModal from '../../components/LoadingModal';
const PendingOrders: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [bidsData, setBidsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const [selectedItem, setSelectedItem] = useState();
  const user = useSelector(state => state.userReducer.user);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleDelete = () => {
    setModalVisible(false);
    deleteBid();
  };
  const deleteBid = async () => {
    try {
      await firestore()
        .collection('crops')
        .doc(selectedItem?.cropId)
        .collection('bids')
        .doc(selectedItem?.bidId)
        .delete();
      getBidsWithCropDataForUser();
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    }
  };
  const renderOrders = ({item}) => (
    <OrderCard
      style={styles.orderCardStyle}
      imageUrl={{uri: item?.cropData?.images?.[0]}}
      cropName={item?.cropData?.title}
      price={item?.bidData?.amount}
      status={'pending'}
      quantity={item?.bidData?.quantity}
      onPress={() => {
        toggleModal();
        setSelectedItem(item);
      }}
      sellerName={item?.sellerData?.name}
      sellerImg={
        item?.sellerData?.profileUrl
          ? {uri: item?.sellerData?.profileUrl}
          : images.Home.userPlaceholder
      }
      pending
    />
  );
  const getBidsWithCropDataForUser = async () => {
    try {
      setIsLoading(true);
      const allBids = [];
      const cropsSnapshot = await firestore().collection('crops').get();

      for (const cropDoc of cropsSnapshot.docs) {
        const cropId = cropDoc.id;
        const cropData = cropDoc.data();
        const bidsSnapshot = await firestore()
          .collection(`crops/${cropId}/bids`)
          .get();
        for (const bidDoc of bidsSnapshot.docs) {
          const bidData = bidDoc.data();
          if (bidData?.bidderId == user?.uid) {
            const userRef = await firestore()
              .collection(`users`)
              .doc(bidData?.bidderId)
              .get();
            const bidderData = userRef.data();
            const sellerRef = await cropData?.userId.get();
            const sellerData = sellerRef.data();
            allBids.push({
              bidId: bidDoc.id,
              bidData: bidData,
              cropData: cropData,
              bidderData: bidderData,
              cropId: cropId,
              sellerData: sellerData,
            });
          }
        }
      }
      setBidsData(allBids);
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isFocused) getBidsWithCropDataForUser();
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        {isLoading ? (
          <ActivityIndicator
            color={theme.colors.primaryButton}
            style={{marginTop: heightPercentageToDP(1)}}
            size={
              Platform.OS == 'ios' ? 'large' : widthPercentageToDP(11)
            }></ActivityIndicator>
        ) : (
          <FlatList
            data={bidsData}
            renderItem={renderOrders}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={EmptyComponent}
          />
        )}
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        style={{margin: 0}}>
        <View style={styles.modalView}>
          <View style={styles.topIndicator}></View>
          <Text style={styles.reviewHeading}>Cancel the Bid?</Text>
          <View style={styles.lineSeperator}></View>
          <OrderCard
            style={styles.modelCartStyle}
            imageUrl={{uri: selectedItem?.cropData?.images?.[0]}}
            cropName={selectedItem?.cropData?.title}
            price={selectedItem?.bidData?.amount}
            quantity={selectedItem?.bidData?.quantity}
            sellerName={selectedItem?.sellerData?.name}
            sellerImg={
              selectedItem?.sellerData?.profileUrl
                ? {uri: selectedItem?.sellerData?.profileUrl}
                : images.Home.userPlaceholder
            }
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
              onPress={handleDelete}
              style={styles.submitButton}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PendingOrders;
