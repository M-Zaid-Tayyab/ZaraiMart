import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Filter from '../../components/Filter';
import images from '../../config/images';
import { dummyReviews, reviewFilter } from '../../utils/dummyData';
import { useStyle } from './styles';
const Review: React.FC = ({route}) => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(-1);
  const handleSelectFilter = (index: number) => {
    setSelectedFilterIndex(index === selectedFilterIndex ? -1 : index);
  };
  const renderReviews = ({item}) => (
    <View style={styles.marginBottom}>
      <View style={styles.rowFlex}>
        <View style={styles.rowContainer}>
        <FastImage
          source={images.Home.zaid}
          style={styles.img}
          resizeMode="contain"
        />
        <Text style={styles.personName}>{item?.name}</Text>
        </View>
        {/* <View style={styles.greenContainer}>
          <View style={styles.rowContainer}>
            <FastImage
              style={styles.star}
              resizeMode="contain"
              source={images.Review.greenStar}
            />
            <Text style={styles.nameText}>{item?.rating}</Text>
          </View>
        </View> */}
      </View>
      <Text style={styles.reviewText}>{item?.review}</Text>
        <Text style={styles.daysText}>{item?.postedDate}</Text>
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
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "4.6 (5,389 reviews)",
      headerShown: true,
      headerStyle: {
        backgroundColor: theme.colors.background,
        borderBottomWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
      },
      headerLeft: () => {
        return (
          <Pressable
            onPress={() => navigation.goBack()}
            style={{paddingLeft: widthPercentageToDP(3)}}>
            <FastImage
              source={images.ForgotPassword.backButton}
              style={{
                height: heightPercentageToDP(4),
                width: widthPercentageToDP(6),
              }}
              resizeMode="contain"
            />
          </Pressable>
        );
      },
      headerTitleStyle: {
        color: theme.colors.primaryText,
        fontFamily: theme.fonts.boldFont,
        fontSize: widthPercentageToDP(5.6),
      },
      headerTransparent: false,
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        {/* <View style={{marginBottom: heightPercentageToDP(2)}}>
          <FlatList
            data={reviewFilter}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={renderFilters}
          />
        </View> */}
        <FlatList
          data={dummyReviews}
          renderItem={renderReviews}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Review;
