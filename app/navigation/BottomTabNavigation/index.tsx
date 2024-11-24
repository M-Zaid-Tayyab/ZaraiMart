import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Text } from 'react-native';
import FastImage from "@d11/react-native-fast-image";
import { useTheme } from 'react-native-paper';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import images from '../../config/images';
import Checkout from '../../screens/Checkout';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Sell from '../../screens/Sell';
import TopTabNavigation from '../TopTabNavigation';
import { useStyle } from './styles';
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const theme = useTheme();
  const style = useStyle();
  const navigation = useNavigation();
  const CustomTabLabel = ({focused, label, color}) => (
    <Text
      style={{
        fontFamily: focused ? theme.fonts.boldFont : theme.fonts.mediumFont,
        color: color,
        fontSize: widthPercentageToDP(3),
      }}>
      {label}
    </Text>
  );

  const screenOptions = {
    tabBarIconStyle: style.tabbarIcon,
    tabBarActiveTintColor: theme.colors.primaryButton,
    tabBarStyle: style.tabbar,
    tabBarInactiveTintColor: theme.colors.placeholderText,
    tabBarHideOnKeyboard: true,
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => (
            <CustomTabLabel focused={focused} label="Home" color={color} />
          ),
          tabBarIcon: ({color, size, focused}) => (
            <FastImage
              source={
                focused
                  ? images.BottomBar.focusedHome
                  : images.BottomBar.unfocusedHome
              }
              style={{width: size, height: size}}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => (
            <CustomTabLabel focused={focused} label="Checkout" color={color} />
          ),
          tabBarIcon: ({color, size, focused}) => (
            <FastImage
              source={
                focused
                  ? images.BottomBar.focusedBag
                  : images.BottomBar.unfocusedBag
              }
              style={{width: size, height: size}}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sell"
        component={Sell}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => (
            <CustomTabLabel focused={focused} label="Sell" color={color} />
          ),
          tabBarIcon: ({color, size, focused}) => (
            <FastImage
              source={
                focused
                  ? images.BottomBar.focusedSell
                  : images.BottomBar.unfocusedSell
              }
              style={{width: size, height: size}}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={TopTabNavigation}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => (
            <CustomTabLabel focused={focused} label="Orders" color={color} />
          ),
          tabBarIcon: ({color, size, focused}) => (
            <FastImage
              source={
                focused
                  ? images.BottomBar.focusedOrders
                  : images.BottomBar.unfocusedOrders
              }
              style={{width: size, height: size}}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => (
            <CustomTabLabel focused={focused} label="Profile" color={color} />
          ),
          tabBarIcon: ({color, size, focused}) => (
            <FastImage
              source={
                focused
                  ? images.BottomBar.focusedProfile
                  : images.BottomBar.unfocusedProfile
              }
              style={{width: size, height: size}}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
