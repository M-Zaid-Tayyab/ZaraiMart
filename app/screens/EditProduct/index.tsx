import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import Modal from 'react-native-modal';
import OrderCard from '../../components/OrderCard';
const EditProduct: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();
  const [fullName, setFullName] = useState('');
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);
  const {control, handleSubmit, formState, watch, setValue} = useForm();
  const [unitValue, setUitValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
      // Handle case when all images are selected
    }
  };
  const handleRemoveImage = key => {
    setImageURIs(prevURIs => ({
      ...prevURIs,
      [key]: null,
    }));
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.subContainer}>
        <View style={styles.space}>
          <View style={styles.selectedImgContainer}>
            <Pressable onPress={() => navigation.goBack()}>
              <FastImage
                source={images.ForgotPassword.backButton}
                style={{
                  height: heightPercentageToDP(4),
                  width: widthPercentageToDP(6),
                }}
                resizeMode="contain"
              />
            </Pressable>
            <Text style={styles.header}>Edit Product</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FastImage
              resizeMode="contain"
              source={images.Product.redDelete}
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </View>
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
            <Text
              style={[
                styles.error,
                {maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end'},
              ]}>
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
            <Text
              style={[
                styles.error,
                {maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end'},
              ]}>
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
            <Text
              style={[
                styles.error,
                {maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end'},
              ]}>
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
            <Text
              style={[
                styles.error,
                {maxWidth: widthPercentageToDP(43), alignSelf: 'flex-end'},
              ]}>
              {formState.errors.description.type === 'required'
                ? 'Description is required'
                : 'Description must be 20 characters'}
            </Text>
          )}
        </View>
        <View style={styles.topStatusContainer}>
          <Pressable
            onPress={() => {
              setSelectedIndex(1);
            }}
            style={[
              styles.outerCircle,
              selectedIndex == 1
                ? {
                    paddingHorizontal: widthPercentageToDP(0.4),
                    paddingVertical: heightPercentageToDP(0.2),
                    borderColor:theme.colors.primaryButton,
                  }
                : null,
            ]}>
            <View style={selectedIndex == 1 ? styles.innerCircle : null}></View>
          </Pressable>
          <Text
            style={[
              styles.statusText,
              {
                color:
                  selectedIndex == 1
                    ? theme.colors.primaryButton
                    : theme.colors.primaryText,
              },
            ]}>
            At Barn
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Pressable
            onPress={() => {
              setSelectedIndex(2);
            }}
            style={[
              styles.outerCircle,
              selectedIndex == 2
                ? {
                    paddingHorizontal: widthPercentageToDP(0.4),
                    paddingVertical: heightPercentageToDP(0.2),
                    borderColor:theme.colors.primaryButton,
                  }
                : null,
            ]}>
            <View style={selectedIndex == 2 ? styles.innerCircle : null}></View>
          </Pressable>
          <Text
            style={[
              styles.statusText,
              {
                color:
                  selectedIndex == 2
                    ? theme.colors.primaryButton
                    : theme.colors.primaryText,
              },
            ]}>
            Loaded on the vehicle
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Pressable
            onPress={() => {
              setSelectedIndex(3);
            }}
            style={[
              styles.outerCircle,
              selectedIndex == 3
                ? {
                    paddingHorizontal: widthPercentageToDP(0.4),
                    paddingVertical: heightPercentageToDP(0.2),
                    borderColor:theme.colors.primaryButton,
                  }
                : null,
            ]}>
            <View style={selectedIndex == 3 ? styles.innerCircle : null}></View>
          </Pressable>
          <Text
            style={[
              styles.statusText,
              {
                color:
                  selectedIndex == 3
                    ? theme.colors.primaryButton
                    : theme.colors.primaryText,
              },
            ]}>
            On the way
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Pressable
            onPress={() => {
              setSelectedIndex(4);
            }}
            style={[
              styles.outerCircle,
              selectedIndex == 4
                ? {
                    paddingHorizontal: widthPercentageToDP(0.4),
                    paddingVertical: heightPercentageToDP(0.2),
                    borderColor:theme.colors.primaryButton,
                  }
                : null,
            ]}>
            <View style={selectedIndex == 4 ? styles.innerCircle : null}></View>
          </Pressable>
          <Text
            style={[
              styles.statusText,
              {
                color:
                  selectedIndex == 4
                    ? theme.colors.primaryButton
                    : theme.colors.primaryText,
              },
            ]}>
           Delivered
          </Text>
        </View>
      </View>
      
      <PrimaryButton
        title="Save"
        style={styles.button}
        disabledWhileAnimating
        onPress={handleSubmit(() => {})}
        animating={isLoading}
      />
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        style={{margin: 0}}>
        <View style={styles.modalView}>
          <View style={styles.topIndicator}></View>
          <Text style={styles.reviewHeading}>
            Delete The Product
          </Text>
          <View style={styles.lineSeperator}></View>
          <Text style={styles.subHeading}>
            Are you sure you want to delete this product? You can't undo it later.
          </Text>
          <View style={styles.lineSeperator}></View>
          <View style={styles.rowContainer}>
            <PrimaryButton
              title="Discard"
              textStyle={{color: theme.colors.primaryButton}}
              onPress={toggleModal}
              style={styles.cancelButton}
            />
            <PrimaryButton
              title="Yes, Delete"
              onPress={toggleModal}
              style={styles.submitButton}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EditProduct;
