// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUUKWLFwn5ad3AwU8jZ0vQ1kukS_ShZd8",
  authDomain: "syno-guesser.firebaseapp.com",
  projectId: "syno-guesser",
  storageBucket: "syno-guesser.appspot.com",
  messagingSenderId: "143499171329",
  appId: "1:143499171329:web:21e6c140d16be3f5b6d200",
  measurementId: "G-RV9ZVGBLHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

