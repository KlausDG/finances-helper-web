import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-DTvKIz5swzeuBLaA8ees9tdBkjLkrHo",
  authDomain: "financial-helper-f6675.firebaseapp.com",
  projectId: "financial-helper-f6675",
  storageBucket: "financial-helper-f6675.appspot.com",
  messagingSenderId: "864721351426",
  appId: "1:864721351426:web:232ee6bb5189cd362c881b",
  measurementId: "G-WT0PBKCG7N",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
