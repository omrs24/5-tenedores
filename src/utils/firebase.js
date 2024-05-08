// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  /*apiKey: "AIzaSyDqyr0gRFYB3db5OmqMQPbwBM_RgaRXbgM",
  authDomain: "tenedores-f3fc1.firebaseapp.com",
  projectId: "tenedores-f3fc1",
  storageBucket: "tenedores-f3fc1.appspot.com",
  messagingSenderId: "695056943245",
  appId: "1:695056943245:web:fbacdd91f7697312effac4",*/
  apiKey: "AIzaSyBcRfytZtPQtLarlxwcRvuvGIZxsSgWt88",
  authDomain: "tenedores-v2-bcc25.firebaseapp.com",
  projectId: "tenedores-v2-bcc25",
  storageBucket: "tenedores-v2-bcc25.appspot.com",
  messagingSenderId: "518110864500",
  appId: "1:518110864500:web:9cf3e48d1c72e9e2559d21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, getApp, db };
