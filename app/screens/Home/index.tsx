import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import CropCard from '../../components/CropCard';
import Searchbar from '../../components/Searchbar';
import images from '../../config/images';
import {enableSnackbar} from '../../redux/slices/snackbarSlice';
import {formateErrorMessage} from '../../utils/helperFunctions';
import {useStyle} from './styles';
import EmptyComponent from '../../components/EmptyComponent';

const Home: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const user = useSelector(state => state.userReducer.user);
  const navigation = useNavigation<any>();
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(-1);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const handleSelectFilter = (index: number) => {
    setSelectedFilterIndex(index === selectedFilterIndex ? -1 : index);
  };
  const [isRecentlyCropsLoading, setIsRecentlyCropsLoading] = useState(true);
  const [isPopularCropsLoading, setIsPopularCropsLoading] = useState(true);
  const [recentCropsData, setRecentCropsData] = useState();
  const [mostPopularCropsData, setMostPopularCropsData] = useState();
  const renderSpecialCrops = ({item}) => (
    <CropCard
      style={{marginRight: widthPercentageToDP(5)}}
      image={{uri: item?.images?.[0]}}
      name={item?.title}
      rating={item?.rating}
      noOfSold={item?.noOfSold}
      price={item?.price}
      isSpecialOffer={true}
      onPress={() => navigation.navigate('Crop',{cropId:item?.id})}
    />
  );
  const renderMostPopularCrops = ({item}) => (
    <CropCard
      style={{marginRight: widthPercentageToDP(5)}}
      image={{uri: item?.images?.[0]}}
      name={item?.title}
      rating={item?.rating}
      noOfSold={item?.noOfSold}
      price={item?.price}
      onPress={() => navigation.navigate('Crop',{cropId:item?.id})}
    />
  );
  const getSortedCrops = async () => {
    try {
      setIsRecentlyCropsLoading(true);
      const cropsSnapshot = await firestore()
        .collection('crops')
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get();
      const cropsData = cropsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecentCropsData(cropsData);
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsRecentlyCropsLoading(false);
    }
  };
  const getPopularCrops = async () => {
    try {
      setIsPopularCropsLoading(true);
      const cropsSnapshot = await firestore()
        .collection('crops')
        .limit(10)
        .get();
      const cropsWithReviewCounts = await Promise.all(
        cropsSnapshot.docs.map(async cropDoc => {
          const cropData = cropDoc.data();
          const cropId = cropDoc.id;

          try {
            const reviewsSnapshot = await firestore()
              .collection('crops')
              .doc(cropId)
              .collection('reviews')
              .get();

            const reviewCount = reviewsSnapshot.size;

            return {
              id: cropId,
              ...cropData,
              reviewCount,
            };
          } catch (error) {
            return {
              id: cropId,
              ...cropData,
              reviewCount: 0,
            };
          }
        }),
      );
      const sortedCrops = cropsWithReviewCounts.sort(
        (a, b) => b.reviewCount - a.reviewCount,
      );

      setMostPopularCropsData(sortedCrops);
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsPopularCropsLoading(false);
    }
  };
  useEffect(() => {
    if (isFocused) {
      getSortedCrops();
      getPopularCrops();
    }
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.rowFlex}>
          <View style={styles.subRowFlex}>
            <FastImage
              source={
                user?.profileUrl
                  ? {uri: user?.profileUrl}
                  : images.Home.userPlaceholder
              }
              style={styles.img}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.nameText}>Hi {user?.name}</Text>
              <Text style={styles.greetingText}>Welcome back </Text>
            </View>
          </View>
          <View style={styles.subRowFlex}>
            <Pressable onPress={() => navigation.navigate('Notification')}>
              <FastImage
                source={images.Home.notification}
                style={styles.icon}
                resizeMode="contain"
              />
              <View style={styles.greenDotNotification}></View>
            </Pressable>
            <Pressable
              style={styles.row}
              onPress={() => {
                navigation.navigate('Inbox');
              }}>
              <FastImage
                source={images.Home.message}
                style={styles.chatIcon}
                resizeMode="contain"
              />
              <View style={styles.greenDot}></View>
            </Pressable>
          </View>
        </View>
        <Searchbar
          onChangeText={() => {}}
          placeholder="Search"
          placeholderColor={theme.colors.placeholderText}
          dummy
          styles={{
            marginBottom: heightPercentageToDP(2),
            paddingVertical:
              Platform.OS === 'ios'
                ? heightPercentageToDP(1.5)
                : heightPercentageToDP(2),
          }}
          rightIcon={() => (
            <FastImage
              source={images.Home.filter}
              style={{
                height: heightPercentageToDP(2.2),
                width: widthPercentageToDP(4.5),
              }}
              resizeMode="contain"
            />
          )}
          onPress={() => {
            navigation.navigate('Search');
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: heightPercentageToDP(18)}}>
          <View
            style={[
              styles.subRowFlex,
              {marginBottom: heightPercentageToDP(2)},
            ]}>
            <Text style={styles.nameText}>Recently Uploaded</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SeeAll', {title: 'recentlyUploaded'});
              }}>
              <Text style={styles.greenText}>See All</Text>
            </TouchableOpacity>
          </View>
          {isRecentlyCropsLoading ? (
            <ActivityIndicator
              color={theme.colors.primaryButton}
              size={'large'}></ActivityIndicator>
          ) : (
            <FlatList
              data={recentCropsData}
              keyExtractor={item => item.id}
              renderItem={renderSpecialCrops}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={EmptyComponent}
            />
          )}

          <View
            style={[
              styles.subRowFlex,
              {marginVertical: heightPercentageToDP(2)},
            ]}>
            <Text style={styles.nameText}>Most Popular</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SeeAll', {title: 'mostPopular'});
              }}>
              <Text style={styles.greenText}>See All</Text>
            </TouchableOpacity>
          </View>

          {isPopularCropsLoading ? (
            <ActivityIndicator
              color={theme.colors.primaryButton}
              size={'large'}></ActivityIndicator>
          ) : (
            <FlatList
              data={mostPopularCropsData}
              keyExtractor={item => item.id}
              renderItem={renderMostPopularCrops}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={EmptyComponent}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
