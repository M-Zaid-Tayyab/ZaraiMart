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
import OrderCard from '../../components/OrderCard';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import {useStyle} from './styles';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {enableSnackbar} from '../../redux/slices/snackbarSlice';
import {formateErrorMessage} from '../../utils/helperFunctions';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import EmptyComponent from '../../components/EmptyComponent';
const ReceivedBids: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const dispatch = useDispatch();
  const [bidsData, setBidsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const user = useSelector(state => state.userReducer.user);
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
          const userRef = await firestore()
            .collection(`users`)
            .doc(bidData?.bidderId)
            .get();
          const bidderData = userRef.data();
          allBids.push({
            bidId: bidDoc.id,
            bidData: bidData,
            cropData: cropData,
            bidderData: bidderData,
            cropId: cropId,
          });
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
  const renderItem = ({item}) => {
    return (
      <View style={styles.bidContainer}>
        <OrderCard
          style={styles.modelCartStyle}
          imageUrl={{
            uri: item?.cropData?.images?.[0],
          }}
          cropName={item?.cropData?.title}
          price={item?.bidData?.amount + '/' + item?.cropData?.unit}
          quantity={item?.bidData?.quantity}
          sellerName={item?.bidderData?.name}
          sellerImg={
            item?.bidderData?.profileUrs || images.Home.userPlaceholder
          }
          fromModal
        />
        <View style={styles.lineSeperator}></View>
        <View style={styles.rowContainer}>
          <PrimaryButton
            title="Reject"
            textStyle={{color: theme.colors.primaryButton}}
            onPress={toggleModal}
            style={styles.cancelButton}
          />
          <PrimaryButton
            title="Accept"
            onPress={toggleModal}
            style={styles.submitButton}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Header title="Received Bids" style={styles.header} />
        {isLoading ? (
          <ActivityIndicator
            color={theme.colors.primaryButton}
            size={
              Platform.OS == 'ios' ? 'large' : widthPercentageToDP(11)
            }></ActivityIndicator>
        ) : (
          <View style={styles.flatListContainer}>
          <FlatList
            data={bidsData}
            ListEmptyComponent={EmptyComponent}
            renderItem={renderItem}
          />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ReceivedBids;
