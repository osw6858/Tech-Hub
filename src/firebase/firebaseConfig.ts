// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwcXRy5wauBwnRc2Z_zOMAmys4WUZBI8E",
  authDomain: "my-blog-6a8bd.firebaseapp.com",
  projectId: "my-blog-6a8bd",
  storageBucket: "my-blog-6a8bd.appspot.com",
  messagingSenderId: "194130935465",
  appId: "1:194130935465:web:417edd8c5432b9a55873b8",
  measurementId: "G-WZMYWF10LV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const apiKey = firebaseConfig.apiKey;
export { app, auth, db, signInWithEmailAndPassword, apiKey };
