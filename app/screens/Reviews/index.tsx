import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {FlatList, Pressable, SafeAreaView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Filter from '../../components/Filter';
import images from '../../config/images';
import {dummyReviews, reviewFilter} from '../../utils/dummyData';
import {useStyle} from './styles';
import Header from '../../components/Header';
const Review: React.FC = ({route}) => {
  const reviews = route?.params?.reviews;
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(-1);
  const handleSelectFilter = (index: number) => {
    setSelectedFilterIndex(index === selectedFilterIndex ? -1 : index);
  };
  function timeAgoFromTimestamp(timestamp) {
    const now = new Date();
    const createdAt = timestamp.toDate();
    const diffInMs = now - createdAt;

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
      return 'just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  }

  const renderReviews = ({item}) => (
    <View style={styles.marginBottom}>
      <View style={styles.rowFlex}>
        <View style={styles.rowContainer}>
          <FastImage
            source={
              item?.reviewedBy?.profileUrl
                ? {uri: item?.reviewedBy?.profileUrl}
                : images.Home.userPlaceholder
            }
            style={styles.img}
          />
          <Text style={styles.personName}>{item?.reviewedBy?.name}</Text>
        </View>
        <View style={styles.greenContainer}>
          <View style={styles.rowContainer}>
            <FastImage
              style={styles.star}
              resizeMode="contain"
              source={images.Review.greenStar}
            />
            <Text style={styles.nameText}>{item?.rating}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.reviewText}>{item?.reviewText}</Text>
      <Text style={styles.daysText}>
        {timeAgoFromTimestamp(item?.createdAt)}
      </Text>
    </View>
  );
  const renderFilters = ({item, index}) => (
    <Filter
      name={item?.rating}
      style={{marginRight: widthPercentageToDP(2)}}
      reviewFilter={true}
      isSelected={index === selectedFilterIndex}
      onPress={() => handleSelectFilter(index)}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Header
          title="Reviews"
          style={{marginBottom: heightPercentageToDP(2)}}
        />
        <FlatList
          data={reviews}
          renderItem={renderReviews}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Review;
