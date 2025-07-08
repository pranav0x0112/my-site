// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9PY_J-YImDGCy9NuOx2VcucqePo67Qjo",
  authDomain: "guestbook-7cf08.firebaseapp.com",
  projectId: "guestbook-7cf08",
  storageBucket: "guestbook-7cf08.appspot.com",
  messagingSenderId: "279025282521",
  appId: "1:279025282521:web:3a4e75163f92f06a41fdc8",
  measurementId: "G-XL4TWD8RRG",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };