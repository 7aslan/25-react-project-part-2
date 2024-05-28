import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
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
const auth = getAuth(firebaseApp);

async function loginUsingEmailAndPassword(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
}

async function registerUsingEmailAndPassword(name, email, password) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
  }
}

async function logout() {
  signOut(auth)
}
export {
  auth,
  loginUsingEmailAndPassword,
  logout,
  registerUsingEmailAndPassword,
};
