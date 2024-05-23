import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDvrAstoazVAGlFZxF6NTQGMHFi9SPzuzY",

  authDomain: "react-interview-firebase-4677a.firebaseapp.com",

  projectId: "react-interview-firebase-4677a",

  storageBucket: "react-interview-firebase-4677a.appspot.com",

  messagingSenderId: "288755520749",

  appId: "1:288755520749:web:1d58259f2c638d1e8ea8e4",

  measurementId: "G-JZ7X9F993M",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
