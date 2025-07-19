// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "YOUR API KEY-cdMyGgkMdo",
  authDomain: "reconlab-139a9.firebaseapp.com",
  projectId: "reconlab-139a9",
  storageBucket: "reconlab-139a9.firebasestorage.app",
  messagingSenderId: "1037140776904",
  appId: "1:1037140776904:web:e4140ee4ce9c71afc812fd",
  measurementId: "G-RZQTWLE5D2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
