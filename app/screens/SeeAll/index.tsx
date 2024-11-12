import firestore from '@react-native-firebase/firestore';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import CropCard from '../../components/CropCard';
import Header from '../../components/Header';
import { enableSnackbar } from '../../redux/slices/snackbarSlice';
import { formateErrorMessage } from '../../utils/helperFunctions';
import { useStyle } from './styles';

const SeeAll: React.FC = ({route}) => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(-1);
  const handleSelectFilter = (index: number) => {
    setSelectedFilterIndex(index === selectedFilterIndex ? -1 : index);
  };
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [isCropsLoading, setIsCropsLoading] = useState(true);
  const [cropsData, setCropsData] = useState();
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
      // setIsCropsLoading(true);
      const cropsSnapshot = await firestore()
        .collection('crops')
        .orderBy('createdAt', 'desc')
        .get();
      const cropsData = cropsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCropsData(cropsData);
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsCropsLoading(false);
    }
  };
  const getPopularCrops = async () => {
    try {
      // setIsCropsLoading(true);
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

      setCropsData(sortedCrops);
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsCropsLoading(false);
    }
  };
  useEffect(() => {
    if (isFocused) {
      if (route?.params?.title == 'recentlyUploaded') {
        getSortedCrops();
      } else getPopularCrops();
    }
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Header
          style={styles.header}
          title={
            route?.params?.title == 'recentlyUploaded'
              ? 'Recently Uploaded'
              : 'Most Popular'
          }
        />
        {isCropsLoading ? (
          <ActivityIndicator
            color={theme.colors.primaryButton}
            size={'large'}></ActivityIndicator>
        ) : (
            <View style={styles.cropContainer}>
              <FlatList
                data={cropsData}
                keyExtractor={item => item.id}
                renderItem={renderMostPopularCrops}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SeeAll;
