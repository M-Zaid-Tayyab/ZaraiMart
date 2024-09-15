/* Login Reducer
 * handles login states in the app
 */
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  snackbarVisible: false,
  snackbarMessage: '',
};

export const snackBarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    enableSnackbar: (state, action) => {
      return {
        ...state,
        snackbarVisible: true,
        snackbarMessage: action.payload,
      };
    },
    disableSnackbar: (state) => {
      return {
        ...state,
        snackbarVisible: false,
        snackbarMessage: '',
      };
    },
  },
});

export const { enableSnackbar, disableSnackbar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
