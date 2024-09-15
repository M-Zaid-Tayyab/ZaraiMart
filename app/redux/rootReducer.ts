import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import userSlice from './slices/userSlice';
import snackBarSlice from './slices/snackbarSlice';
import themeSlice from './slices/themeSlice';
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  userReducer: userSlice,
  snackbarReducer:snackBarSlice,
  themeReducer:themeSlice
});
const persistedRootReducer = persistReducer(persistConfig, rootReducer);
export default persistedRootReducer;
