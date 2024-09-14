import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {heightPercentageToDP, widthPercentageToDP} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import CropCard from '../../components/CropCard';
import {dummyCropData} from '../../utils/dummyData';
import {useStyle} from './styles';
import Header from '../../components/Header';
const MyProducts: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const userImg = useSelector(state => state.userReducer.profileImg);
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
      price={item?.price}
      fromProducts
      onPress={() => navigation.navigate('Edit Product')}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
      <Header title="My Products" style={styles.header} />
      <View style={{paddingBottom:heightPercentageToDP(15)}}>
        <FlatList
          data={dummyCropData}
          keyExtractor={item => item.id}
          renderItem={renderMostPopularCrops}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyProducts;
