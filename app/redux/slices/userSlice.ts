import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    token: '',
    user: null,
    isOnboarded: false,
    rememberMe: false,
    profileImg:null,
  },
  reducers: {
    saveToken: (state, action) => {
      return {...state, token: action?.payload};
    },
    saveUser: (state, action) => {
      return {...state, user: action?.payload};
    },
    onBoardingCompleted: state => {
      return {...state, isOnboarded: true};
    },
    onRememberMe: (state, action) => {
      return {...state, rememberMe: action?.payload};
    },
    updateProfileImg: (state, action) => {
      return {...state, profileImg: action?.payload};
    },
    removeUser: (state, action) => {
      return {
        ...state,
        token: '',
        user: null,
      };
    },
  },
});

export const {
  saveToken,
  saveUser,
  removeUser,
  onBoardingCompleted,
  onRememberMe,
  updateProfileImg,
} = userSlice.actions;

export default userSlice.reducer;
