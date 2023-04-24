import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

const authSlice = createSlice({
  name: 'authorisation',
  initialState: {
    user: null,
  },
  reducers: {
    signUp(state, action) {
      state.user = action.payload
      console.log(action.payload)
    },
    signIn(state, action) {
      state.user = action.payload
    },
    logOut(state) {
      signOut(auth);
      state.user = null
    },
    setUser(state, action) {
      state.user = action.payload
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
