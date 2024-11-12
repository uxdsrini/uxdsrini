// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZPrrGeVWVsDItIel5Tk43hrXfW_tpWvI",
  authDomain: "uxdsrini-74fa5.firebaseapp.com",
  projectId: "uxdsrini-74fa5",
  storageBucket: "uxdsrini-74fa5.firebasestorage.app",
  messagingSenderId: "258587413449",
  appId: "1:258587413449:web:b262c9b9564bf7451af618"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence);