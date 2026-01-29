import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP-djSfCJlMkCOTYRGxM44uycNJH_fnQs",
  authDomain: "dermobotanics-68c00.firebaseapp.com",
  projectId: "dermobotanics-68c00",
  storageBucket: "dermobotanics-68c00.appspot.com",
  messagingSenderId: "582980557996",
  appId: "1:582980557996:web:0b12c943d44b97c545309"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);
