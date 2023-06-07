import { createSlice } from '@reduxjs/toolkit';

const state = {
  userId: null,
  login: null,
  userAvatar: null,
  stateChange: false,
  userEmail: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      userAvatar: payload.userAvatar,
      userEmail: payload.userEmail,
    }),

    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});

export const authReducer = authSlice.reducer;
