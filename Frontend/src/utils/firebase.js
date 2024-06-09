// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey: "AIzaSyA7mB7dykGN7nAMNHcTgLNy_qZL75pAtLI",
  authDomain: "treetask-59d44.firebaseapp.com",
  projectId: "treetask-59d44",
  storageBucket: "treetask-59d44.appspot.com",
  messagingSenderId: "1064944583561",
  appId: "1:1064944583561:web:51c94dabd2c18f554e5758"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);