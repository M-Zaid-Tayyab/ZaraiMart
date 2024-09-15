import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import persistedRootReducer from './rootReducer';

const store = configureStore({
  reducer: persistedRootReducer,
  //
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: ['persist/PERSIST'] },
    }),
});
export default store;
export const persistor = persistStore(store);
