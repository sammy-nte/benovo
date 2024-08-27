// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPdsiDdF7ybfX2g_7flcZKNdZubs8IKMI",
  authDomain: "schoolproject-10d43.firebaseapp.com",
  projectId: "schoolproject-10d43",
  storageBucket: "schoolproject-10d43.appspot.com",
  messagingSenderId: "321257400321",
  appId: "1:321257400321:web:23c4cf14976381830a7800",
  measurementId: "G-85FCRRSYCD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
const analytics = getAnalytics(app);