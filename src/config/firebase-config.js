import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQEK3V4FF-Bt9pCWfWeHySLEuQ9Rl8zdU",
  authDomain: "onex-online-exam.firebaseapp.com",
  projectId: "onex-online-exam",
  storageBucket: "onex-online-exam.appspot.com",
  messagingSenderId: "598527458363",
  appId: "1:598527458363:web:90b4e0bcfe6678ff94301e",
  measurementId: "G-ZFBG57PBQD"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)