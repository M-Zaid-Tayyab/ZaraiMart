/**
 * React Native App
 * Everything starts from the Entry-point
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../app/redux/store';
import AppNavigator from './navigation/NavigationStack';
import DefaultTheme from './theme/DefaultTheme';
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
          <AppNavigator />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default EntryPoint;
