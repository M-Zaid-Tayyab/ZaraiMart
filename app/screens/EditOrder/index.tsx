import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import InputBoxWithIcon from '../../components/InputBoxWithIcon';
import LoadingModal from '../../components/LoadingModal';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import {enableSnackbar} from '../../redux/slices/snackbarSlice';
import {cropCategories, unitsData} from '../../utils/dummyData';
import {formateErrorMessage} from '../../utils/helperFunctions';
import {useStyle} from './styles';
const EditOrder: React.FC = ({route}) => {
  const styles = useStyle();
  const theme = useTheme();
  const params = route?.params;
  const item = params?.item;
  const notifications = params?.notifications;
  const user = useSelector(state => state?.userReducer?.user);
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState();
  const {control, handleSubmit, formState, watch, setValue} = useForm();
  const [unitValue, setUitValue] = useState(item?.cropData?.unit);
  const [categoryValue, setCategoryValue] = useState(item?.cropData?.category);
  const [isFocus, setIsFocus] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(
    notifications && notifications?.length > 0 ? true : false,
  );
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const closeModal = async () => {
    if (currentNotificationIndex <= notifications?.length - 1) {
      const orderRef = firestore().collection('orders').doc(item?.orderId);
      await orderRef.update({
        notifications: firestore.FieldValue.arrayRemove(
          notifications?.[currentNotificationIndex],
        ),
      });
      setVisible(true);
      setCurrentNotificationIndex(currentNotificationIndex + 1);
    } else {
      setVisible(false);
      setCurrentNotificationIndex(0);
    }
  };
  const getDaysLeft = deadline => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const timeDiff = deadlineDate - currentDate;
    if (timeDiff <= 0) {
      return 'Over due';
    }

    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysLeft > 0) {
      return `${daysLeft} day(s) left`;
    }
  };
  const dispatch = useDispatch();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const deleteOrder = async () => {
    try {
      setVisible(false);
      setIsLoadingModalVisible(true);
      const orderRef = firestore().collection('orders').doc(item?.orderId);
      await orderRef.update({
        status: 'Cancelled',
        cancelledAt: firestore.FieldValue.serverTimestamp(),
        notifications: firestore.FieldValue.arrayRemove(
          notifications?.[currentNotificationIndex],
        ),
      });
      navigation.goBack();
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsLoadingModalVisible(false);
    }
  };
  const handleRequest = async request => {
    setModalVisible(false)
    setIsLoading(true);
    const orderRef = firestore().collection('orders').doc(item?.orderId);
    try {
      const notificationData = {
        request: request == 'complete' ? 'Completed' : 'Deleted',
        requestedBy: user?.uid,
        status: 'Pending',
      };

      await orderRef.update({
        notifications: firestore.FieldValue.arrayUnion(notificationData),
      });

      navigation.goBack();
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteOrder = async () => {
    setVisible(false);
    try {
      setIsLoadingModalVisible(true);
      const orderRef = firestore().collection('orders').doc(item?.orderId);
      await orderRef.update({
        status: 'Completed',
        completedAt: firestore.FieldValue.serverTimestamp(),
        notifications: firestore.FieldValue.arrayRemove(
          notifications?.[currentNotificationIndex],
        ),
      });
      navigation.goBack();
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsLoadingModalVisible(false);
    }
  };
  const viewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);
  const renderImages = ({item}) => (
    <FastImage resizeMode="stretch" source={{uri: item}} style={styles.img} />
  );
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.subContainer}>
        <View style={styles.space}>
          <View style={styles.selectedImgContainer}>
            <Pressable onPress={() => navigation.goBack()}>
              <FastImage
                source={images.ForgotPassword.backButton}
                style={styles.backIcn}
                resizeMode="contain"
              />
            </Pressable>
            <Text style={styles.header}>Update Order</Text>
          </View>
          <TouchableOpacity onPress={toggleModal}>
            <FastImage
              resizeMode="contain"
              source={images.Product.redDelete}
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={item?.cropData?.images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderImages}
          horizontal
          pagingEnabled
          bounces={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 30,
            minimumViewTime: 200,
          }}
        />
        <View style={styles.dotContainer}>
          {item?.cropData?.images?.map((_, index) => (
            <View
              key={index}
              style={
                index == currentIndex ? styles.longDot : styles.shortDot
              }></View>
          ))}
        </View>
        <View style={styles.controller}>
          <InputBoxWithIcon
            onChangeText={() => {}}
            inputStyle={styles.inputStyle}
            numberOfCharacter={30}
            showPrimary
            disabled
            value={item?.cropData?.title}
            placeholder="Title..."
          />
        </View>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={unitsData}
          disable
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Unit' : '...'}
          searchPlaceholder="Search..."
          containerStyle={styles.unitContainerStyle}
          value={unitValue}
          onChange={item => {
            setUitValue(item.value);
          }}
        />
        <View style={styles.controller}>
          <InputBoxWithIcon
            onChangeText={() => {}}
            inputStyle={styles.inputStyle}
            numberOfCharacter={30}
            showPrimary
            disabled
            value={item?.price}
            placeholder="Price..."
          />
        </View>
        <View style={styles.controller}>
          <InputBoxWithIcon
            onChangeText={() => {}}
            inputStyle={styles.inputStyle}
            numberOfCharacter={30}
            showPrimary
            disabled
            value={item?.location}
            placeholder="Location..."
          />
        </View>
        <View style={styles.controller}>
          <InputBoxWithIcon
            onChangeText={() => {}}
            inputStyle={styles.inputStyle}
            numberOfCharacter={30}
            showPrimary
            disabled
            value={item?.quantity}
            placeholder="Quantity..."
          />
        </View>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={cropCategories}
          search
          containerStyle={styles.containerStyle}
          maxHeight={300}
          labelField="label"
          valueField="value"
          disable
          placeholder={!isFocus ? 'Select Category' : '...'}
          searchPlaceholder="Search..."
          value={categoryValue}
          onChange={item => {
            setCategoryValue(item.value);
          }}
        />
        <View style={styles.controller}>
          <InputBoxWithIcon
            onChangeText={() => {}}
            inputStyle={styles.inputStyle}
            numberOfCharacter={3000}
            showPrimary
            disabled
            value={item?.instruction}
            placeholder="Instruction..."
          />
        </View>
        <View style={styles.controller}>
          <InputBoxWithIcon
            onChangeText={() => {}}
            inputStyle={styles.inputStyle}
            numberOfCharacter={3000}
            showPrimary
            disabled
            value={getDaysLeft(item?.deadline)}
            placeholder="Deadline..."
          />
        </View>
      </View>

      <PrimaryButton
        title="Mark as Complete"
        style={styles.button}
        disabledWhileAnimating
        onPress={() => handleRequest('complete')}
        animating={isLoading}
      />

      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        style={{margin: 0}}>
        <View style={styles.modalView}>
          <View style={styles.topIndicator}></View>
          <Text style={styles.reviewHeading}>Delete the Order</Text>
          <View style={styles.lineSeperator}></View>
          <Text style={styles.subHeading}>
            Are you sure you want to delete this order? You can't undo it later.
          </Text>
          <View style={styles.lineSeperator}></View>
          <View style={styles.rowContainer}>
            <PrimaryButton
              title="Discard"
              textStyle={{color: theme.colors.primaryButton}}
              onPress={toggleModal}
              style={styles.cancelButton}
            />
            <PrimaryButton
              title="Yes, Delete"
              onPress={() => handleRequest('delete')}
              style={styles.submitButton}
            />
          </View>
        </View>
      </Modal>
      <Modal isVisible={visible}>
        <View style={styles.requestModal}>
          <View style={styles.topIndicator}></View>
          <Text style={styles.reviewHeading}>Order Request</Text>
          <View style={styles.lineSeperator}></View>
          <Text style={styles.subHeading}>
            {item?.buyerId ==
            notifications?.[currentNotificationIndex]?.requestedBy
              ? 'Buyer'
              : 'Seller'}{' '}
            wants to{' '}
            {notifications?.[currentNotificationIndex]?.request == 'Completed'
              ? 'complete'
              : 'delete'}{' '}
            this order
          </Text>
          <View style={styles.lineSeperator}></View>
          <View style={styles.requestModalContainer}>
            <PrimaryButton
              title="Discard"
              textStyle={{color: theme.colors.primaryButton}}
              onPress={closeModal}
              style={styles.cancelButton}
            />
            <PrimaryButton
              title={
                notifications?.[currentNotificationIndex]?.request ==
                'Completed'
                  ? 'Yes, Complete'
                  : 'Yes, Delete'
              }
              onPress={
                notifications?.[currentNotificationIndex]?.request ==
                'Completed'
                  ? handleCompleteOrder
                  : deleteOrder
              }
              style={styles.submitButton}
            />
          </View>
        </View>
      </Modal>
      <LoadingModal visible={isLoadingModalVisible} />
    </ScrollView>
  );
};

export default EditOrder;
