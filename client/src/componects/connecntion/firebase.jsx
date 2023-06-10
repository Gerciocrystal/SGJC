import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyD8Wc-y1cL6i0k3cKGLCCWTN7_454X8t4E",
  authDomain: "sgjc-storage.firebaseapp.com",
  projectId: "sgjc-storage",
  storageBucket: "sgjc-storage.appspot.com",
  messagingSenderId: "188459715198",
  appId: "1:188459715198:web:c353924b63b508dfc5a62f",
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;
