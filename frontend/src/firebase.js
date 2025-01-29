// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-bbc4a.firebaseapp.com",
  projectId: "mern-estate-bbc4a",
  storageBucket: "mern-estate-bbc4a.appspot.com",
  messagingSenderId: "632162301677",
  appId: "1:632162301677:web:bc7cf314dab8c54bfebee4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);