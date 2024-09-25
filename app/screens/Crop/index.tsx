import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import {dummyCropData} from '../../utils/dummyData';
import {useStyle} from './styles';
import Modal from 'react-native-modal';
import {Controller, useForm} from 'react-hook-form';
import InputBoxWithIcon from '../../components/InputBoxWithIcon';
import firestore from '@react-native-firebase/firestore';
import {enableSnackbar} from '../../redux/slices/snackbarSlice';
import {formateErrorMessage} from '../../utils/helperFunctions';
import {useDispatch} from 'react-redux';
const Crop: React.FC = ({route}) => {
  const {cropId} = route?.params;
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const {control, handleSubmit, formState, watch, setValue} = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [cropDetails, setCropDetails] = useState();
  const dispatch = useDispatch();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const viewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      console.log("Viewable Items:", viewableItems);
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);
  const renderImages = ({item}) => (
    <FastImage resizeMode="stretch" source={{uri: item}} style={styles.img} />
  );
  const getCropData = async () => {
    try {
      setIsLoading(true);
      const cropRef = await firestore().collection('crops').doc(cropId).get();
      if (cropRef.exists) {
        const cropData = cropRef.data();
        const userRef = await cropData?.userId.get();
        if (userRef) {
          const userData = userRef.data();
          setCropDetails({
            ...cropData,
            userId: userData,
          });
        }
      }
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCropData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          color={theme.colors.primaryButton}
          style={{alignSelf:'center'}}
          size={widthPercentageToDP(11)}></ActivityIndicator>
      ) : (
        <>
          <View style={{height: heightPercentageToDP(52)}}>
            <FlatList
              data={cropDetails?.images}
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
          </View>
          <View style={styles.dotContainer}>
            {cropDetails?.images?.map((_, index) => (
              <View
                key={index}
                style={
                  index == currentIndex ? styles.longDot : styles.shortDot
                }></View>
            ))}
          </View>
          <View style={styles.subContainer}>
            <View style={styles.rowFlex}>
              <Text style={styles.nameText}>{cropDetails?.title}</Text>
            </View>
            <View style={styles.reviewContainer}>
              <View style={styles.greenContainer}>
                <Text style={styles.soldText}>
                  {cropDetails?.noOfSold} Sold
                </Text>
              </View>
              <FastImage
                source={images.Home.star}
                style={styles.star}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.ratingContainer}
                onPress={() => navigation.navigate('Review')}>
                <Text style={styles.reviewText}>
                  {cropDetails?.rating} ({cropDetails?.reviews?.length || '0'}{' '}
                  reviews)
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sellerContainer}>
              <View style={styles.row}>
                <FastImage
                  source={{uri: cropDetails?.userId?.profileUrl}}
                  style={styles.sellerImg}
                  resizeMode="cover"
                />
                <Text style={styles.headingText}>
                  {cropDetails?.userId?.name}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.messageContainer}
                onPress={() => {
                  navigation.navigate('Chat');
                }}>
                <Text style={styles.messageText}>Message</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.lineSeparator}></View>
            <Text style={styles.headingText}>Description</Text>
            <Text style={styles.descriptionText}>
              {cropDetails?.description}
            </Text>
            <View style={styles.quantityContainer}>
              <Text style={styles.headingText}>Quantity</Text>
              <View style={styles.greyContainer}>
                <Text style={styles.quantityText}>
                  {cropDetails?.quantity} {cropDetails?.unit}
                </Text>
              </View>
            </View>
            <View style={styles.lineSeparator}></View>
            <View style={styles.priceContainer}>
              <View>
                <Text style={styles.priceHeading}>Minimum Price</Text>
                <Text style={styles.priceText}>
                  Rs {cropDetails?.price}/{cropDetails?.unit}
                </Text>
              </View>
              <PrimaryButton
                style={styles.button}
                title="Place Bid"
                onPress={() => setModalVisible(true)}
              />
            </View>
          </View>
        </>
      )}

      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        swipeThreshold={120}
        swipeDirection={'down'}
        style={{margin: 0}}>
        <View style={styles.modalView}>
          <View style={styles.topIndicator}></View>
          <Text style={styles.sortText}>Place Bid</Text>
          <View style={styles.lineSeperator}></View>
          <View style={styles.controller}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <InputBoxWithIcon
                  onChangeText={onChange}
                  inputStyle={styles.inputStyle}
                  style={{width: widthPercentageToDP(94)}}
                  numberOfCharacter={7}
                  keyboardType="dialpad"
                  value={value}
                  placeholder="Price you are offering..."
                />
              )}
              name="price"
            />

            {formState.errors.price && (
              <Text style={[styles.error, {maxWidth: widthPercentageToDP(43)}]}>
                Price is required
              </Text>
            )}
          </View>
          <View style={styles.controller}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <InputBoxWithIcon
                  onChangeText={onChange}
                  inputStyle={styles.inputStyle}
                  style={{width: widthPercentageToDP(94)}}
                  numberOfCharacter={50}
                  value={value}
                  placeholder="Location..."
                />
              )}
              name="location"
            />

            {formState.errors.location && (
              <Text style={[styles.error, {maxWidth: widthPercentageToDP(43)}]}>
                Location is required
              </Text>
            )}
          </View>
          <View style={styles.controller}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <InputBoxWithIcon
                  onChangeText={onChange}
                  inputStyle={styles.inputStyle}
                  numberOfCharacter={7}
                  keyboardType="dialpad"
                  value={value}
                  placeholder="Quantity..."
                />
              )}
              name="quantity"
            />

            {formState.errors.quantity && (
              <Text style={[styles.error, {maxWidth: widthPercentageToDP(43)}]}>
                Quantity is required
              </Text>
            )}
          </View>
          <View style={styles.controller}>
            <Controller
              control={control}
              rules={{
                required: 'Description is required',
                minLength: {
                  value: 20,
                  message: 'Description must be 20 characters',
                },
              }}
              render={({field: {onChange, value}}) => (
                <InputBoxWithIcon
                  onChangeText={onChange}
                  numberOfCharacter={40}
                  value={value}
                  style={{width: widthPercentageToDP(94)}}
                  inputStyle={styles.inputStyle}
                  placeholder="Description..."
                />
              )}
              name="description"
            />
            {formState.errors.description && (
              <Text style={[styles.error, {maxWidth: widthPercentageToDP(43)}]}>
                {formState.errors.description.type === 'required'
                  ? 'Description is required'
                  : 'Description must be 20 characters'}
              </Text>
            )}
          </View>
          <PrimaryButton
            onPress={toggleModal}
            style={styles.applyButton}
            title="Proceed"
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Crop;
