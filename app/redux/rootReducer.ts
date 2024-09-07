import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import userSlice from './slices/userSlice';
const persistConfig = {
  key: 'root',
  version: 1,
  // AsyncStorage can also be used in place of redux persist storage
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  userReducer: userSlice,
});
const persistedRootReducer = persistReducer(persistConfig, rootReducer);
export default persistedRootReducer;
