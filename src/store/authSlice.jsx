import { createSlice } from '@reduxjs/toolkit';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const authSlice = createSlice({
  name: 'authorisation',
  initialState: {
    user: null,
  },
  reducers: {
    //User sign up
    signUp(state, action) {
      state.user = action.payload;
    },
    //Use sign in
    signIn(state, action) {
      state.user = action.payload;
    },
    //User log out
    logOut(state) {
      signOut(auth);
      state.user = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
