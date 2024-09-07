import {Slider} from '@miblanchard/react-native-slider';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import React, {useState, useMemo} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CropCard from '../../components/CropCard';
import Filter from '../../components/Filter';
import PrimaryButton from '../../components/PrimaryButton';
import Searchbar from '../../components/Searchbar';
import images from '../../config/images';
import {
  dummyCropData,
  reviewFilter,
  sortData,
  vegetableData,
} from '../../utils/dummyData';
import {useStyle} from './styles';

const Search: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [searchedQuery, setSearchedQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(10000);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000);
  const [isFocused, setIsFocused] = useState(true);
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
  const handleOnSubmitEditing = () => {
    if (searchedQuery.length > 0) setShowResults(true);
  };
  const renderFoundCrops = ({item}) => (
    <CropCard
      style={{marginRight: widthPercentageToDP(5)}}
      image={{uri: item?.imageUrl}}
      name={item?.name}
      rating={item?.rating}
      noOfSold={item?.noOfSold}
      price={item?.price}
      onPress={() => navigation.navigate('Crop')}
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
          <View>
            <View style={styles.rowContainer}>
              <View style={styles.resultTextContainer}>
                <Text style={styles.resultText}>Results for{' "'}</Text>
                <Text style={styles.queryText}>{searchedQuery}</Text>
                <Text style={styles.resultText}>{'"'}</Text>
              </View>
              <Text style={styles.itemText}>0 found</Text>
            </View>
            <View style={{paddingBottom: heightPercentageToDP(33)}}>
              <FlatList
                data={dummyCropData}
                keyExtractor={item => item.id}
                renderItem={renderFoundCrops}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{marginTop: heightPercentageToDP(3)}}
              />
            </View>
          </View>
        ) : null}
        {isFocused ? (
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
        ) : null}
        {/* Logic to be implemented to show if the results are not being found */}
        {/* <View style={styles.notFoundContainer}>
          <FastImage
            source={images.Search.notFound}
            style={styles.noFoundImg}
            resizeMode="stretch"
          />
          <Text style={styles.notFoundText}>Not found</Text>
          <Text style={styles.notFoundDescription}>
            Sorry, the keyword you entered cannot be found, please check again
            or search with another keyword.
          </Text>
        </View> */}
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
          <FlatList
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
          <FlatList
            data={sortData}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={renderPopularityFilters}
          />
          <Text style={styles.headingText}>Rating</Text>
          <FlatList
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
