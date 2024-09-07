import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useStyle} from './styles';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';
const AddNewAddress: React.FC = () => {
  const styles = useStyle();
  const theme = useTheme();

  const [userLocation, setUserLocation] = useState([0, 0]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getUserLocation();
        } else {
          console.log('Location permission denied');
        }
      } else if (Platform.OS === 'ios') {
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === RESULTS.GRANTED) {
          getUserLocation();
        } else {
          console.log('Location permission denied');
        }
      }
    };

    const getUserLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          console.log('latitude: ', latitude, ' longitude: ', longitude);
          setUserLocation([longitude, latitude]);
        },
        error => {
          console.error(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    requestLocationPermission();
  }, []);
  return (
    <View style={styles.page}>
     
    </View>
  );
};

export default AddNewAddress;
