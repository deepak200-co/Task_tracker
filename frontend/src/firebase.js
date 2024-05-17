import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAGP93IVpiunRTJ6A_D_eI8dmfqh3tO19M",
  authDomain: "task-tracker-8fcff.firebaseapp.com",
  projectId: "task-tracker-8fcff",
  storageBucket: "task-tracker-8fcff.appspot.com",
  messagingSenderId: "315775396565",
  appId: "1:315775396565:web:209f6f3827cd45acfed05c",
  measurementId: "G-2RMPQQ2ZZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;