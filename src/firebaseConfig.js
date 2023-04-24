// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1VqIhpaLbNV5USkcqkiqHWc2kTWOD3dE",
  authDomain: "clone-45dce.firebaseapp.com",
  projectId: "clone-45dce",
  storageBucket: "clone-45dce.appspot.com",
  messagingSenderId: "594413043178",
  appId: "1:594413043178:web:4633a86457fdfe4ca28693",
  measurementId: "G-MNCXSM941W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =  getFirestore(app);
