// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqyr0gRFYB3db5OmqMQPbwBM_RgaRXbgM",
  authDomain: "tenedores-f3fc1.firebaseapp.com",
  projectId: "tenedores-f3fc1",
  storageBucket: "tenedores-f3fc1.appspot.com",
  messagingSenderId: "695056943245",
  appId: "1:695056943245:web:fbacdd91f7697312effac4",
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);
