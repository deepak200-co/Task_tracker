import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from 'firebase/messaging';


const firebaseConfig = {
  apiKey: "AIzaSyC7vTjkSEDEQ2neD6fveplRUrwX_jB2wd0",
  authDomain: "assignment-95b91.firebaseapp.com",
  projectId: "assignment-95b91",
  storageBucket: "assignment-95b91.appspot.com",
  messagingSenderId: "595966263516",
  appId: "1:595966263516:web:050e0df3e0eb64ba697419",
  measurementId: "G-LQY6T19DHK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const messaging = getMessaging(app)
const requestFCMPermission = async () => {
  try {
    const messagingPermission = await messaging.requestPermission();
    if (messagingPermission === 'granted') {
      const token = await messaging.getToken();
      console.log('FCM Token:', token);
      // Save the token to your backend if needed
    } else {
      console.error('Notification permission denied');
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};
export { auth, firestore, messaging, requestFCMPermission };

