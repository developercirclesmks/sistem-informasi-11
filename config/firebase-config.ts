import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
	apiKey: import.meta.env.VITE_PUBLIC_apiKey,
	authDomain: import.meta.env.VITE_PUBLIC_authDomain,
	projectId: import.meta.env.VITE_PUBLIC_projectId,
	storageBucket: import.meta.env.VITE_PUBLIC_storageBucket,
	messagingSenderId: import.meta.env.VITE_PUBLIC_messagingSenderId,
	appId: import.meta.env.VITE_PUBLIC_appId,
	measurementId: import.meta.env.VITE_PUBLIC_measurementId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
