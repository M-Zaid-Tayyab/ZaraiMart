import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: null,
    isOnboarded: false,
  },
  reducers: {
    saveUser: (state, action) => {
      return {...state, user: action?.payload};
    },
    onBoardingCompleted: state => {
      return {...state, isOnboarded: true};
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

export const {saveUser, removeUser, onBoardingCompleted,} =
  userSlice.actions;

export default userSlice.reducer;
