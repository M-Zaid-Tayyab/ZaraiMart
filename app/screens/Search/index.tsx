import { Slider } from '@miblanchard/react-native-slider';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { FlatList as GestureHandlerFlatList } from 'react-native-gesture-handler';

import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CropCard from '../../components/CropCard';
import EmptyComponent from '../../components/EmptyComponent';
import Filter from '../../components/Filter';
import Header from '../../components/Header';
import PrimaryButton from '../../components/PrimaryButton';
import Searchbar from '../../components/Searchbar';
import images from '../../config/images';
import {
  reviewFilter,
  sortData,
  vegetableData
} from '../../utils/dummyData';
import { useStyle } from './styles';

const Search: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [searchedQuery, setSearchedQuery] = useState('');
  const [showResults, setShowResults] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(10000);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);
  const [isFocused, setIsFocused] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [cropsData, setCropsData] = useState();
  const [selectedPopularFilterIndex, setSelectedPopularFilterIndex] =
    useState(-1);
  const handleSelectPopularFilter = (index: number) => {
    setSelectedPopularFilterIndex(
      index === selectedPopularFilterIndex ? -1 : index,
    );
  };
  const [selectedCropFilterIndex, setSelectedCropFilterIndex] = useState(-1);
  const handleSelectCropFilter = (index: number) => {
    setSelectedCropFilterIndex(index === selectedCropFilterIndex ? -1 : index);
  };
  const [selectedReviewFilterIndex, setSelectedReviewFilterIndex] =
    useState(-1);
  const handleSelectReviewFilter = (index: number) => {
    setSelectedReviewFilterIndex(
      index === selectedReviewFilterIndex ? -1 : index,
    );
  };
  const handleIsFocused = val => {
    setIsFocused(val);
  };
  const handleSliderChange = _.debounce(value => {
    setHigh(value[0]);
  }, 10);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleReset = () => {
    setHigh(() => max);
  };
  const handleChangeText = (txt: string) => {
    setShowResults(false);
    setSearchedQuery(txt);
  };
  const calculateAverageRating = reviews => {
    if (reviews?.length === 0) return 0;

    const totalRating = reviews?.reduce(
      (acc, review) => acc + review?.rating,
      0,
    );
    return totalRating / reviews?.length;
  };
  const handleOnSubmitEditing = async () => {
    try {
      setIsLoading(true);
      setShowResults(true);
      const cropsSnapshot = await firestore()
        .collection('crops')
        .where('title', '>=', searchedQuery)
        .where('title', '<=', searchedQuery + '\uf8ff')
        .get();

      const cropsWithReviews = [];

      for (const cropDoc of cropsSnapshot.docs) {
        const cropData = {
          id: cropDoc.id,
          ...cropDoc.data(),
        };

        const reviewsSnapshot = await firestore()
          .collection('crops')
          .doc(cropDoc.id)
          .collection('reviews')
          .get();

        const reviews = reviewsSnapshot.docs.map(reviewDoc => ({
          id: reviewDoc.id,
          ...reviewDoc.data(),
        }));
        const averageRating = calculateAverageRating(reviews);
        cropsWithReviews.push({
          ...cropData,
          reviews,
          averageRating,
        });
      }

      setCropsData(cropsWithReviews);
    } catch (error) {
      console.error('Error searching crops:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const renderFoundCrops = ({item}) => (
    <CropCard
      style={{marginRight: widthPercentageToDP(5)}}
      image={{uri: item?.images?.[0]}}
      name={item?.title}
      rating={item?.averageRating}
      noOfSold={item?.noOfSold}
      price={item?.price}
      onPress={() => navigation.navigate('Crop', {cropId: item?.id})}
    />
  );
  const renderRecent = ({item}) => (
    <View style={styles.recentContainer}>
      <Text style={styles.recentText}>{item?.name}</Text>
      <TouchableOpacity>
        <FastImage
          source={images.Search.remove}
          style={styles.removeImg}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
  const renderCropFilters = ({item, index}) => (
    <Filter
      name={item?.name}
      style={{marginRight: widthPercentageToDP(2)}}
      isSelected={index === selectedCropFilterIndex}
      onPress={() => handleSelectCropFilter(index)}
    />
  );
  const renderPopularityFilters = ({item, index}) => (
    <Filter
      name={item?.name}
      style={{marginRight: widthPercentageToDP(2)}}
      isSelected={index === selectedPopularFilterIndex}
      onPress={() => handleSelectPopularFilter(index)}
    />
  );
  const renderRatingFilters = ({item, index}) => (
    <Filter
      name={item?.rating}
      style={{marginRight: widthPercentageToDP(2)}}
      reviewFilter={true}
      isSelected={index === selectedReviewFilterIndex}
      onPress={() => handleSelectReviewFilter(index)}
    />
  );
  const renderThumbComponent = () => (
    <FastImage
      source={images.Search.cursor}
      style={{
        height: heightPercentageToDP(2.5),
        width: widthPercentageToDP(5),
      }}
      resizeMode="contain"
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Header title="Search" />
        <Searchbar
          isFocused={handleIsFocused}
          onChangeText={handleChangeText}
          onSubmitEditing={handleOnSubmitEditing}
          placeholder="Search"
          placeholderColor={theme.colors.placeholderText}
          styles={{paddingVertical: heightPercentageToDP(0.3)}}
          rightIcon={() => (
            <TouchableOpacity onPress={toggleModal}>
              <FastImage
                source={images.Search.filter}
                style={{
                  height: heightPercentageToDP(2.2),
                  width: widthPercentageToDP(4.5),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        />
        {showResults && !isFocused ? (
  isLoading ? (
    <ActivityIndicator
      color={theme.colors.primaryButton}
      style={{marginTop: heightPercentageToDP(1)}}
      size={Platform.OS == 'ios' ? 'large' : widthPercentageToDP(11)}
    />
  ) : (
    <View>
      <View style={styles.rowContainer}>
        <View style={styles.resultTextContainer}>
          <Text style={styles.resultText}>Results for{' "'}</Text>
          <Text style={styles.queryText}>{searchedQuery}</Text>
          <Text style={styles.resultText}>{'"'}</Text>
        </View>
        <Text style={styles.itemText}>{cropsData?.length} found</Text>
      </View>
          <FlatList
            data={cropsData}
            keyExtractor={item => item.id}
            renderItem={renderFoundCrops}
            numColumns={2}
            ListEmptyComponent={EmptyComponent}
            contentContainerStyle={{paddingBottom:heightPercentageToDP(35)}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: heightPercentageToDP(3)}}
          />
    </View>
  )
) : undefined}

        {/* {isFocused ? (
          <View>
            <View style={styles.rowContainer}>
              <View style={styles.resultTextContainer}>
                <Text style={styles.resultText}>Recent</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.itemText}>Clear All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.lineSeperator}></View>
            <View style={{paddingBottom: heightPercentageToDP(13)}}>
              <FlatList
                data={dummyCropData}
                keyExtractor={item => item.id}
                renderItem={renderRecent}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        ) : null} */}
      </View>
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
          <Text style={styles.sortText}>Sort & Filter</Text>
          <View style={styles.lineSeperator}></View>
          <Text style={styles.headingText}>Categories</Text>
          <GestureHandlerFlatList
            data={vegetableData}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={renderCropFilters}
          />
          <View style={styles.buttonContainer}>
            <Text style={styles.headingText}>Price Range</Text>
            <Text style={styles.headingText}>
              {' '}
              {low} - {high}
            </Text>
          </View>
          <Slider
            maximumValue={max}
            step={100}
            value={high}
            renderThumbComponent={renderThumbComponent}
            onValueChange={handleSliderChange}
            trackStyle={styles.trackStyle}
            minimumTrackStyle={{backgroundColor: theme.colors.primaryButton}}
          />
          <Text style={styles.headingText}>Sort by</Text>
          <GestureHandlerFlatList
            data={sortData}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={renderPopularityFilters}
          />
          <Text style={styles.headingText}>Rating</Text>
          <GestureHandlerFlatList
            data={reviewFilter}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={renderRatingFilters}
          />
          <View style={styles.lineSeperator}></View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={handleReset}
              style={styles.resetButton}
              title="Reset"
              textStyle={{color: theme.colors.primaryButton}}
            />
            <PrimaryButton
              onPress={toggleModal}
              style={styles.applyButton}
              title="Apply"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Search;
