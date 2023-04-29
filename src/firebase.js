import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCDFqjmj3o1TgATaZwbY_WmTAvybagU-Zw",
  authDomain: "reactchat-e4d7b.firebaseapp.com",
  projectId: "reactchat-e4d7b",
  storageBucket: "reactchat-e4d7b.appspot.com",
  messagingSenderId: "535193694844",
  appId: "1:535193694844:web:ba4f5bf0dee6e0e2720ff9",
};



export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
