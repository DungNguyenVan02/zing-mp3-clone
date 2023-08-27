// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'auth-zing-mp3.firebaseapp.com',
    projectId: 'auth-zing-mp3',
    storageBucket: 'auth-zing-mp3.appspot.com',
    messagingSenderId: '1087784169881',
    appId: '1:1087784169881:web:74e248cdcbd0b96b2e6308',
    measurementId: 'G-6RPJLVTFE3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

export { auth, fbProvider, ggProvider, db };
