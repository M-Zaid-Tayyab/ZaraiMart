import {useNavigation} from '@react-navigation/native';
import React, {useState, useLayoutEffect} from 'react';
import {FlatList, SafeAreaView, View, Pressable} from 'react-native';
import {useTheme} from 'react-native-paper';
import images from '../../config/images';
import FastImage from 'react-native-fast-image';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CropCard from '../../components/CropCard';
import Filter from '../../components/Filter';
import {dummyCropData, vegetableData} from '../../utils/dummyData';
import {useStyle} from './styles';
import Header from '../../components/Header';
const SeeAll: React.FC = ({route}) => {
  const styles = useStyle();
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(-1);
  const handleSelectFilter = (index: number) => {
    setSelectedFilterIndex(index === selectedFilterIndex ? -1 : index);
  };
  const renderMostPopularCrops = ({item}) => (
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
  const renderFilters = ({item, index}) => (
    <Filter
      name={item?.name}
      style={{marginRight: widthPercentageToDP(2)}}
      isSelected={index === selectedFilterIndex}
      onPress={() => handleSelectFilter(index)}
    />
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route?.params?.title,
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
        <View style={{marginBottom: heightPercentageToDP(2)}}>
          <FlatList
            data={vegetableData}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={renderFilters}
          />
        </View>
        <FlatList
          data={dummyCropData}
          keyExtractor={item => item.id}
          renderItem={renderMostPopularCrops}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default SeeAll;
