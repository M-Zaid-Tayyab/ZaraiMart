import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, SafeAreaView, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import CropCard from '../../components/CropCard';
import {dummyCropData} from '../../utils/dummyData';
import {useStyle} from './styles';
import Header from '../../components/Header';
import firestore from '@react-native-firebase/firestore';
import {enableSnackbar} from '../../redux/slices/snackbarSlice';
import {formateErrorMessage} from '../../utils/helperFunctions';
const MyProducts: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const isFocused=useIsFocused()
  const user = useSelector(state => state.userReducer.user);
  const navigation = useNavigation<any>();
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(-1);
  const dispatch = useDispatch();
  const [cropsData, setCropsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const handleSelectFilter = (index: number) => {
    setSelectedFilterIndex(index === selectedFilterIndex ? -1 : index);
  };
  const renderMostPopularCrops = ({item}) => {
    return (
      <CropCard
        style={{marginRight: widthPercentageToDP(5)}}
        image={{uri: item?.images?.[0]}}
        name={item?.title}
        rating={item?.rating}
        noOfSold={item?.noOfSold}
        price={item?.price}
        onPress={() => navigation.navigate('Edit Product', {crop: item})}
      />
    );
  };
  const getCropsByUser = async () => {
    try {
      setIsLoading(true);
      const cropsSnapshot = await firestore()
        .collection('crops')
        .where('userId', '==', firestore().doc(`users/${user?.uid}`))
        .get();

      const crops = cropsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCropsData(crops);
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if(isFocused)
    getCropsByUser();
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Header title="My Products" style={styles.header} />
        {isLoading ? (
          <ActivityIndicator
            color={theme.colors.primaryButton}
            size={'large'}></ActivityIndicator>
        ) : (
          <View style={{paddingBottom: heightPercentageToDP(15)}}>
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

export default MyProducts;
