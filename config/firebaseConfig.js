import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKF6KZeJU6Y83hc1AYxICPzgF6dWf4WUw",
  authDomain: "urmil-jewellers-notifications.firebaseapp.com",
  projectId: "urmil-jewellers-notifications",
  storageBucket: "urmil-jewellers-notifications.firebasestorage.app",
  messagingSenderId: "371351911834",
  appId: "1:371351911834:android:1f16023874f50180fc0e23"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
