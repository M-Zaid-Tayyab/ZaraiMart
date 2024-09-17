import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import InputBoxWithIcon from '../../components/InputBoxWithIcon';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import {cropCategories, unitsData} from '../../utils/dummyData';
import {useStyle} from './styles';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import {enableSnackbar} from '../../redux/slices/snackbarSlice';
import { formateErrorMessage } from '../../utils/helperFunctions';
const Sell: React.FC = () => {
  const user = useSelector(state => state.userReducer.user);
  const styles = useStyle();
  const theme = useTheme();
  const [fullName, setFullName] = useState('');
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);
  const {control, handleSubmit, formState, watch, setValue} = useForm();
  const [unitValue, setUitValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const [imageURIs, setImageURIs] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const handleImagePick = async key => {
    try {
      const response = await launchImageLibrary({mediaType: 'photo'});
      if (!response.didCancel) {
        if (response.assets && response.assets.length > 0) {
          setImageURIs(prevURIs => ({
            ...prevURIs,
            [key]: response.assets[0].uri,
          }));
        }
      }
    } catch (error) {
      console.error('ImagePicker Error: ', error);
    }
  };
  const handleSelectImage = () => {
    let firstNullKey = null;
    for (const key in imageURIs) {
      if (imageURIs[key] === null) {
        firstNullKey = key;
        break;
      }
    }
    if (firstNullKey !== null) {
      handleImagePick(firstNullKey);
    } else {
    }
  };
  const handleRemoveImage = key => {
    setImageURIs(prevURIs => ({
      ...prevURIs,
      [key]: null,
    }));
  };
  const uploadImages = async imageArray => {
    const imageUrls = [];
    for (const imageUri of imageArray) {
      const fileName = imageUri.split('/').pop();
      const storageRef = storage().ref(`crops/${fileName}`);

      await storageRef.putFile(imageUri);

      const downloadUrl = await storageRef.getDownloadURL();
      imageUrls.push(downloadUrl);
    }

    return imageUrls;
  };
  const uploadCropData = async (data: any) => {
    try {
      const imageArray = Object.values(imageURIs).filter(uri => uri !== null);
      if (imageArray.length == 0) {
        dispatch(enableSnackbar('At least 1 image is required'));
        return;
      }
      else if (!unitValue) {
        dispatch(enableSnackbar('Unit value is required'));
        return;
      }
      else if (!categoryValue) {
        dispatch(enableSnackbar('Category value is required'));
        return;
      }
      setIsLoading(true);
      const imageUrls = await uploadImages(imageArray);
      const cropDoc = {
        images: imageUrls,
        title: data.title,
        unit: unitValue,
        price: data.price,
        location: data.location,
        quantity: data.quantity,
        category: categoryValue,
        noOfSold: 0,
        rating: 0,
        description: data.description,
        userId: firestore().doc(`users/${user?.uid}`),
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
      await firestore().collection('crops').add(cropDoc);
      navigation.navigate('Pay Now', {fromSell: true});
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.subContainer}>
        <Pressable style={styles.imgContainer} onPress={handleSelectImage}>
          <FastImage
            source={images.Sell.image}
            style={styles.addImg}
            resizeMode="stretch"
          />
          <Text style={styles.imgTxt}>Upload Image</Text>
        </Pressable>
        <View style={styles.row}>
          {imageURIs['image1'] ? (
            <View style={styles.selectedImgContainer}>
              <FastImage
                source={{uri: imageURIs['image1']}}
                resizeMode="cover"
                style={styles.selectedImg}
              />
              <Pressable onPress={() => handleRemoveImage('image1')}>
                <FastImage
                  source={images.Sell.remove}
                  style={styles.removeImg}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          ) : (
            <View style={styles.subImgContainer}>
              <FastImage
                source={images.Sell.image}
                style={styles.imgPlaceholder}
                resizeMode="contain"
              />
            </View>
          )}
          {imageURIs['image2'] ? (
            <View style={styles.selectedImgContainer}>
              <FastImage
                source={{uri: imageURIs['image2']}}
                resizeMode="cover"
                style={styles.selectedImg}
              />
              <Pressable onPress={() => handleRemoveImage('image2')}>
                <FastImage
                  source={images.Sell.remove}
                  style={styles.removeImg}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          ) : (
            <View style={styles.subImgContainer}>
              <FastImage
                source={images.Sell.image}
                style={styles.imgPlaceholder}
                resizeMode="contain"
              />
            </View>
          )}
          {imageURIs['image3'] ? (
            <View style={styles.selectedImgContainer}>
              <FastImage
                source={{uri: imageURIs['image3']}}
                resizeMode="cover"
                style={styles.selectedImg}
              />
              <Pressable onPress={() => handleRemoveImage('image3')}>
                <FastImage
                  source={images.Sell.remove}
                  style={styles.removeImg}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          ) : (
            <View style={styles.subImgContainer}>
              <FastImage
                source={images.Sell.image}
                style={styles.imgPlaceholder}
                resizeMode="contain"
              />
            </View>
          )}
          {imageURIs['image4'] ? (
            <View style={styles.selectedImgContainer}>
              <FastImage
                source={{uri: imageURIs['image4']}}
                resizeMode="cover"
                style={styles.selectedImg}
              />
              <Pressable onPress={() => handleRemoveImage('image4')}>
                <FastImage
                  source={images.Sell.remove}
                  style={styles.removeImg}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          ) : (
            <View style={styles.subImgContainer}>
              <FastImage
                source={images.Sell.image}
                style={styles.imgPlaceholder}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
        <View style={styles.controller}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <InputBoxWithIcon
                onChangeText={onChange}
                inputStyle={styles.inputStyle}
                style={{width: widthPercentageToDP(94)}}
                numberOfCharacter={30}
                value={value}
                placeholder="Title..."
              />
            )}
            name="title"
          />

          {formState.errors.title && (
            <Text style={[styles.error, {maxWidth: widthPercentageToDP(43)}]}>
              Title is required
            </Text>
          )}
        </View>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={unitsData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Unit' : '...'}
          searchPlaceholder="Search..."
          containerStyle={styles.unitContainerStyle}
          value={unitValue}
          onChange={item => {
            setUitValue(item.value);
          }}
        />
        <View style={styles.controller}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <InputBoxWithIcon
                onChangeText={onChange}
                inputStyle={styles.inputStyle}
                style={{width: widthPercentageToDP(94)}}
                numberOfCharacter={7}
                keyboardType="dialpad"
                value={value}
                placeholder={`Price${unitValue ? '/' + unitValue : ''}`}
              />
            )}
            name="price"
          />

          {formState.errors.price && (
            <Text style={[styles.error, {maxWidth: widthPercentageToDP(43)}]}>
              Price is required
            </Text>
          )}
        </View>
        <View style={styles.controller}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <InputBoxWithIcon
                onChangeText={onChange}
                inputStyle={styles.inputStyle}
                style={{width: widthPercentageToDP(94)}}
                numberOfCharacter={50}
                value={value}
                placeholder="Location..."
              />
            )}
            name="location"
          />

          {formState.errors.location && (
            <Text style={[styles.error, {maxWidth: widthPercentageToDP(43)}]}>
              Location is required
            </Text>
          )}
        </View>
        <View style={styles.controller}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <InputBoxWithIcon
                onChangeText={onChange}
                inputStyle={styles.inputStyle}
                numberOfCharacter={7}
                keyboardType="dialpad"
                value={value}
                placeholder="Quantity..."
              />
            )}
            name="quantity"
          />

          {formState.errors.quantity && (
            <Text style={[styles.error, {maxWidth: widthPercentageToDP(43)}]}>
              Quantity is required
            </Text>
          )}
        </View>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={cropCategories}
          search
          containerStyle={styles.containerStyle}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Category' : '...'}
          searchPlaceholder="Search..."
          value={categoryValue}
          onChange={item => {
            setCategoryValue(item.value);
          }}
        />
        <View style={styles.controller}>
          <Controller
            control={control}
            rules={{
              required: 'Description is required',
              minLength: {
                value: 20,
                message: 'Description must be 20 characters',
              },
            }}
            render={({field: {onChange, value}}) => (
              <InputBoxWithIcon
                onChangeText={onChange}
                numberOfCharacter={40}
                value={value}
                style={{width: widthPercentageToDP(94)}}
                inputStyle={styles.inputStyle}
                placeholder="Description..."
              />
            )}
            name="description"
          />
          {formState.errors.description && (
            <Text style={[styles.error, {maxWidth: widthPercentageToDP(43)}]}>
              {formState.errors.description.type === 'required'
                ? 'Description is required'
                : 'Description must be 20 characters'}
            </Text>
          )}
        </View>
      </View>
      <PrimaryButton
        title="Post Product"
        style={styles.button}
        disabledWhileAnimating
        onPress={handleSubmit(uploadCropData)}
        animating={isLoading}
      />
    </ScrollView>
  );
};

export default Sell;
