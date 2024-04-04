// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAvmbsTuzVwUA-fyRZtfwe5mP8WloX2tCY',
  authDomain: 'ftmpc-63d81.firebaseapp.com',
  projectId: 'ftmpc-63d81',
  storageBucket: 'ftmpc-63d81.appspot.com',
  messagingSenderId: '142004919903',
  appId: '1:142004919903:web:f03b691800272690b785ea',
  measurementId: 'G-3L6YJ71LTC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const pfp = getStorage(app, 'gs://ftmpc-63d81.appspot.com');
const auth = getAuth(app);

export { app, db, pfp, auth };
