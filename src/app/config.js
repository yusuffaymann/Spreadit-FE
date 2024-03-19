// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCD3gZtKfgcwYl_Qep2RmXCJMG_RuROdyE",
  authDomain: "oauth-fad14.firebaseapp.com",
  projectId: "oauth-fad14",
  storageBucket: "oauth-fad14.appspot.com",
  messagingSenderId: "574078206639",
  appId: "1:574078206639:web:fc29f04ae18763bc2c8a5a",
  measurementId: "G-K88TPTE8X7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export{auth,provider};