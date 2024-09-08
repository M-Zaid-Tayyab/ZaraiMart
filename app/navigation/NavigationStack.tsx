import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Platform, Pressable, StatusBar, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import images from '../config/images';
import Address from '../screens/Address';
import Chat from '../screens/Chat';
import Checkout from '../screens/Checkout';
import Crop from '../screens/Crop';
import EditProfile from '../screens/EditProfile';
import ForgotPassword from '../screens/ForgotPassword';
import Inbox from '../screens/Inbox';
import Login from '../screens/Login';
import NewPassword from '../screens/NewPassword';
import Onboard from '../screens/Onboard';
import OtpPassword from '../screens/OtpPassword';
import Review from '../screens/Reviews';
import Search from '../screens/Search';
import SeeAll from '../screens/SeeAll';
import ShippingAddress from '../screens/ShippingAddress';
import Signup from '../screens/Signup';
import VerifySignUp from '../screens/VerifySignUp';
import BottomTabNavigation from './BottomTabNavigation';
import Notification from '../screens/Notification';
import {useSelector} from 'react-redux';
import AddNewAddress from '../screens/AddNewAddress';
import PayNow from '../screens/PayNow';
import MyProducts from '../screens/MyProducts';
import EditProduct from '../screens/EditProduct';
import ReceivedBids from '../screens/ReceivedBids';
const Stack = createStackNavigator();
function AuthNavigator() {
  const theme = useTheme();
  const navigation = useNavigation();
  const commonOptions = ({route}) => ({
    headerShown: true,
    headerStyle: {
      backgroundColor: theme.colors.background,
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    },
    headerLeft: () => (
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
    ),
    headerTitleStyle: {
      color: theme.colors.primaryText,
      fontFamily: theme.fonts.boldFont,
      fontSize: widthPercentageToDP(5.6),
    },
    headerTransparent: false,
    title: route?.params?.name,
  });
  return (
    <Stack.Navigator initialRouteName="Onboard">
      <Stack.Screen
        name="Onboard"
        component={Onboard}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function MainNavigator() {
  const theme = useTheme();
  const navigation = useNavigation();
  const commonOptions = ({route}) => ({
    headerShown: true,
    headerStyle: {
      backgroundColor: theme.colors.error,
      borderBottomWidth: 0,
      shadowOpacity: 0,
      elevation: 0,
    },
    headerLeft: () => (
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
    ),
    headerTitleStyle: {
      color: theme.colors.primaryText,
      fontFamily: theme.fonts.boldFont,
      fontSize: widthPercentageToDP(5.6),
    },
    headerTransparent: false,
    title: route?.params?.name,
  });
  return (
    <Stack.Navigator initialRouteName='Main'>
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Forgot Password"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="One Time Password"
        component={OtpPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Create New Password"
        component={NewPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VerifySignUp"
        component={VerifySignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        component={BottomTabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SeeAll"
        component={SeeAll}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Crop"
        component={Crop}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Review"
        component={Review}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit Product"
        component={EditProduct}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Inbox" component={Inbox} options={{headerShown: false}} />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Pay Now" component={PayNow} options={{headerShown: false}} />
      <Stack.Screen
        name="My Products"
        component={MyProducts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Received Bids"
        component={ReceivedBids}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Shipping Address"
        component={ShippingAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Add New Address"
        component={AddNewAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const isOnboarded = useSelector(state => state.userReducer.isOnboarded);
  return (
      <NavigationContainer>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        {isOnboarded ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
  );
}

export default AppNavigator;
