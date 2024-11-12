import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { CommonActions } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import { useTheme } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from '../../components/LoadingModal';
import PrimaryButton from '../../components/PrimaryButton';
import images from '../../config/images';
import { enableSnackbar } from '../../redux/slices/snackbarSlice';
import { saveUser } from '../../redux/slices/userSlice';
import { formateErrorMessage } from '../../utils/helperFunctions';
import { useStyle } from './styles';

const Profile: React.FC = () => {
  const styles = useStyle();
  const user = useSelector(state => state.userReducer.user);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedImg, setSelectedImg] = useState('');
  const navigation = useNavigation<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [whichModal, setWhichModal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  useLayoutEffect(() => {
    if (isFocused) setSelectedImg(user?.profileUrl);
  }, [isFocused]);
  const Option = props => (
    <Pressable style={styles.rowContainer} onPress={props?.onPress}>
      <View style={styles.row}>
        <FastImage
          source={props?.leftIcon}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.optionText,
            props?.allRed
              ? {color: '#F75555'}
              : {color: theme.colors.primaryText},
          ]}>
          {props?.title}
        </Text>
      </View>
      <FastImage
        source={props?.rightIcon}
        style={styles.icon}
        resizeMode="contain"
      />
    </Pressable>
  );
  const handleImagePick = async key => {
    try {
      const response = await launchImageLibrary({mediaType: 'photo'});
      if (!response.didCancel) {
        if (response.assets && response.assets.length > 0) {
          setSelectedImg(response.assets[0].uri);
          handleProfilePictureUpdate(response.assets[0].uri, user?.uid);
        }
      }
    } catch (error) {
      console.error('ImagePicker Error: ', error);
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleLogout = () => {
    setWhichModal(() => 'Logout');
    toggleModal();
  };
  const handleDeleteAccount = () => {
    setWhichModal(() => 'Delete');
    toggleModal();
  };
  const onLogoutPress = () => {
    setModalVisible(!isModalVisible);
    dispatch(saveUser(null));
    navigation.dispatch(
      CommonActions.reset({
        index: 0, 
        routes: [{ name: 'Home' }],
      })
    );
    navigation.navigate('Login');
  };
  const handleProfilePictureUpdate = async (newImageUri, userId) => {
    try {
      setIsLoading(true);
      const userRef = firestore().collection('users').doc(userId);

      const userDoc = await userRef.get();
      const oldProfileUrl = userDoc.exists ? userDoc.data().profileUrl : null;

      if (oldProfileUrl) {
        const oldProfileRef = storage().refFromURL(oldProfileUrl);
        await oldProfileRef.delete();
        console.log('Old profile picture deleted successfully.');
      }

      const newProfileFilename = `profilePictures/profile_${userId}_${Date.now()}.jpg`;
      const newProfileRef = storage().ref(newProfileFilename);
      await newProfileRef.putFile(newImageUri);

      const newProfileUrl = await newProfileRef.getDownloadURL();

      await userRef.update({
        profileUrl: newProfileUrl,
      });
      const updatedUser = (await userRef.get()).data();
      const {createdAt, ...restUpdatedData} = updatedUser;
      dispatch(
        saveUser({
          ...user,
          ...restUpdatedData,
          uid: user.uid,
        }),
      );
      console.log('Profile picture updated successfully.');
    } catch (error) {
      dispatch(enableSnackbar(formateErrorMessage(error.message)));
      console.error('Error updating profile picture:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.infoContainer}>
          <FastImage
            source={
              selectedImg ? {uri: selectedImg} : images.Home.userPlaceholder
            }
            style={styles.img}
          />
          <Pressable style={styles.penContainer} onPress={handleImagePick}>
            <FastImage
              source={images.Profile.pen}
              style={styles.penIcon}
              resizeMode="contain"
            />
          </Pressable>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{user?.name}</Text>
          <Text style={styles.numberText}>{user?.phone}</Text>
        </View>
        <View style={styles.lineSeperator}></View>
        <Option
          leftIcon={images.Profile.profile}
          title="Edit Profile"
          rightIcon={images.Profile.next}
          onPress={() => {
            navigation.navigate('Edit Profile');
          }}
        />
        {/* <Option
          leftIcon={images.Profile.location}
          title="Address"
          rightIcon={images.Profile.next}
          onPress={() => {
            navigation.navigate('Address');
          }}
        /> */}
        <Option
          leftIcon={images.Product.box}
          title="My Products"
          rightIcon={images.Profile.next}
          onPress={() => navigation.navigate('My Products')}
        />
        <Option
          leftIcon={images.Profile.bidding}
          title="Received Bids"
          rightIcon={images.Profile.next}
          onPress={() => navigation.navigate('Received Bids')}
        />
        <Option
          leftIcon={images.Profile.sentBids}
          title="Sent Bids"
          rightIcon={images.Profile.next}
          onPress={() => navigation.navigate('SentBids')}
        />
        {/* <Option
          leftIcon={images.Profile.wallet}
          title="Payment"
          rightIcon={images.Profile.next}
        /> */}
        <Option
          leftIcon={images.Profile.logout}
          allRed
          title="Logout"
          onPress={handleLogout}
        />
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
        animationInTiming={400}
        animationOutTiming={900}
        backdropTransitionInTiming={400}
        backdropTransitionOutTiming={900}
        style={{margin: 0}}>
        <View style={styles.modalView}>
          <View style={styles.topIndicator}></View>
          <Text style={styles.heading}>
            {whichModal === 'Logout' ? 'Logout' : 'Delete Account'}
          </Text>
          <View style={styles.lineSeperator}></View>
          <Text style={styles.secHeading}>
            {whichModal === 'Logout'
              ? 'Are you sure you want to log out?'
              : 'Are you sure you want to delete the account?'}
          </Text>
          <View style={styles.rowContainer}>
            <PrimaryButton
              title="Cancel"
              textStyle={{color: theme.colors.primaryButton}}
              onPress={toggleModal}
              style={styles.cancelButton}
            />
            <PrimaryButton
              title={
                whichModal === 'Logout' ? 'Yes, Logout' : 'Yes, Delete Account'
              }
              onPress={() => {
                whichModal === 'Logout' ? onLogoutPress() : toggleModal();
              }}
              style={[
                styles.submitButton,
                whichModal === 'Logout'
                  ? {width: widthPercentageToDP(40)}
                  : {width: widthPercentageToDP(50)},
              ]}
            />
          </View>
        </View>
      </Modal>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default Profile;
