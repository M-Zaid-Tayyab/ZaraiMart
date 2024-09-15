/* Login Reducer
 * handles login states in the app
 */
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  safeAreaViewBackground: 'white',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateSafeAreaBackground: (state, action) => {
      return {
        ...state,
        safeAreaViewBackground: action.payload,
      };
    },
  },
});

export const { updateSafeAreaBackground } = themeSlice.actions;
export default themeSlice.reducer;
