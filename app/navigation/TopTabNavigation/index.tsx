import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import ActiveOrders from '../../screens/ActiveOrders';
import CompletedOrders from '../../screens/CompletedOrders';
import PendingOrders from '../../screens/PendingOrders';
import { useStyle } from './styles';
const Tab = createMaterialTopTabNavigator();

const TopTabNavigation = () => {
  const theme = useTheme();
  const styles = useStyle();
  const topTabOptions = {
    tabBarLabelStyle: styles.label,
    tabBarActiveTintColor: theme.colors.primaryButton,
    tabBarInactiveTintColor: theme.colors.placeholderText,
    tabBarIndicatorStyle: styles.indicatorStyle,
    tabBarStyle: {
      elevation: 0,
      shadowOpacity: 0,
    },
  };
  const navigation = useNavigation();
  return (
    <Tab.Navigator screenOptions={topTabOptions}>
      <Tab.Screen name="Active" component={ActiveOrders} />
      <Tab.Screen name="Pending" component={PendingOrders} />
      <Tab.Screen name="Completed" component={CompletedOrders} />
    </Tab.Navigator>
  );
};

export default TopTabNavigation;
