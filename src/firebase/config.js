// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABbNvSxaiuiiHwxr1gNQGzvZNiTjGLkao",
  authDomain: "deedi-2983c.firebaseapp.com",
  projectId: "deedi-2983c",
  storageBucket: "deedi-2983c.appspot.com",
  messagingSenderId: "198719342238",
  appId: "1:198719342238:web:264304918b8f4d05d29d8f",
  measurementId: "G-XMJ3HX1BFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
