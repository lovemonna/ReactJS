// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import { getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
        GoogleAuthProvider,
        signInWithPopup,
        signOut,
     } from "firebase/auth";
import { getDatabase ,ref,set } from "firebase/database";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUgPpMqJpz6Ug8XF0zZbyjYZewv2UdDuQ",
  authDomain: "fir-project1-5f2da.firebaseapp.com",
  projectId: "fir-project1-5f2da",
  storageBucket: "fir-project1-5f2da.appspot.com",
  messagingSenderId: "489307968397",
  appId: "1:489307968397:web:e42d8308e99713b9cf63c4",
  measurementId: "G-ZTNJ3C2CNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//separting database API and authentication
// const db = firebase.database();
const auth = getAuth(app);
// auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const db = getDatabase(app);

// Initialize Firebase Cloud Messaging and get a reference to the service

const messaging = getMessaging(app);

export { db, 
    auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    provider,
    signOut,
    ref,
    set,
    messaging,
    getToken,
  };