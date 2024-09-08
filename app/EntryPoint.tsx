/**
 * React Native App
 * Everything starts from the Entry-point
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {LogBox, Platform, SafeAreaView} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from '../app/redux/store';
import AppNavigator from './navigation/NavigationStack';
import DefaultTheme from './theme/DefaultTheme';
import {heightPercentageToDP} from 'react-native-responsive-screen';
const EntryPoint: React.FC = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  useEffect(() => {
    AsyncStorage.clear();
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 1000);
  // }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={DefaultTheme as any}>
          <SafeAreaView
            style={{
              paddingTop: Platform.OS === 'ios' ? 0 : heightPercentageToDP(2),
              flex: 1,
              backgroundColor: 'white',
            }}>
            <AppNavigator />
          </SafeAreaView>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default EntryPoint;
