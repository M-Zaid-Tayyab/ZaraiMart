import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
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
import CropCard from '../../components/CropCard';
import Filter from '../../components/Filter';
import Searchbar from '../../components/Searchbar';
import images from '../../config/images';
import {dummyCropData, vegetableData} from '../../utils/dummyData';
import {useSelector} from 'react-redux';
import {useStyle} from './styles';
const Home: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const userImg = useSelector(state => state.userReducer.profileImg);
  const navigation = useNavigation<any>();
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(-1);
  const handleSelectFilter = (index: number) => {
    setSelectedFilterIndex(index === selectedFilterIndex ? -1 : index);
  };
  const renderSpecialCrops = ({item}) => (
    <CropCard
      style={{marginRight: widthPercentageToDP(5)}}
      image={images.Onboard.page1}
      name={item?.name}
      rating={item?.rating}
      noOfSold={item?.noOfSold}
      price={item?.price}
      isSpecialOffer={true}
      onPress={() => navigation.navigate('Crop')}
    />
  );
  const renderMostPopularCrops = ({item}) => (
    <CropCard
      style={{marginRight: widthPercentageToDP(5)}}
      image={images.Onboard.page1}
      name={item?.name}
      rating={item?.rating}
      noOfSold={item?.noOfSold}
      price={item?.price}
      onPress={() => navigation.navigate('Crop')}
    />
  );
  const renderFilters = ({item, index}) => (
    <Filter
      name={item?.name}
      style={{marginRight: widthPercentageToDP(2)}}
      isSelected={index === selectedFilterIndex}
      onPress={() => handleSelectFilter(index)}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.rowFlex}>
          <View style={styles.subRowFlex}>
            <FastImage
              source={images.Home.zaid}
              style={styles.img}
              resizeMode="cover"
            />
            <View>
              <Text style={styles.greetingText}>Good Morning 👋</Text>
              <Text style={styles.nameText}>Muhammad Zaid</Text>
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
          showsHorizontalScrollIndicator={false}>
          <View
            style={[
              styles.subRowFlex,
              {marginBottom: heightPercentageToDP(2)},
            ]}>
            <Text style={styles.nameText}>Special Offers</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SeeAll', {title: 'Special Offers'});
              }}>
              <Text style={styles.greenText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={dummyCropData}
            keyExtractor={item => item.id}
            renderItem={renderSpecialCrops}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
          <View
            style={[
              styles.subRowFlex,
              {marginVertical: heightPercentageToDP(2)},
            ]}>
            <Text style={styles.nameText}>Most Popular</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SeeAll', {title: 'Most Popular'});
              }}>
              <Text style={styles.greenText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: heightPercentageToDP(2)}}>
            <FlatList
              data={vegetableData}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={renderFilters}
            />
          </View>
          <View style={{paddingBottom:heightPercentageToDP(18)}}>
          <FlatList
            data={dummyCropData}
            keyExtractor={item => item.id}
            renderItem={renderMostPopularCrops}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
