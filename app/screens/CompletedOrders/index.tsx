import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, Text, View, FlatList} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useStyle} from './styles';
import OrderCard from '../../components/OrderCard';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {dummyOrderData} from '../../utils/dummyData';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating-widget';
import FastImage from 'react-native-fast-image';
import images from '../../config/images';
import InputBoxWithIcon from '../../components/InputBoxWithIcon';
import PrimaryButton from '../../components/PrimaryButton';
const CompletedOrders: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const renderOrders = ({item}) => (
    <OrderCard
      style={styles.orderCardStyle}
      imageUrl={{uri: item?.imageUrl}}
      cropName={item?.cropName}
      price={item?.price}
      status={'completed'}
      quantity={item?.quantity}
      onPress={toggleModal}
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
              imageUrl={{uri: 'https://source.unsplash.com/400x300/?tomatoes'}}
              cropName="Tomatoes"
              price={parseInt((Math.random() * 10000).toFixed(2))}
              status="completed"
              quantity={Math.floor(Math.random() * 100) + 1}
              sellerName="Zaid"
              sellerImg={images.Home.userPlaceholder}
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
                onPress={toggleModal}
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
