import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJS250KEv-vUNVX8E6ZRphYkVj_nJ_wtA",
  authDomain: "house-marketplace-2aba8.firebaseapp.com",
  projectId: "house-marketplace-2aba8",
  storageBucket: "house-marketplace-2aba8.appspot.com",
  messagingSenderId: "916223618867",
  appId: "1:916223618867:web:1fec88f50bd12acaf4d846",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
