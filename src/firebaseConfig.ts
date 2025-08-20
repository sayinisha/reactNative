import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAPQQSfBq1mDnl5_Xkxc5zEJnuWF2ywd6M",
  authDomain: "pet-registration-e26f1.firebaseapp.com",
  projectId: "pet-registration-e26f1",
  storageBucket: "pet-registration-e26f1.firebasestorage.app",
  messagingSenderId: "29771794247",
  appId: "1:29771794247:web:14aa2a7ed60df31767ee62",
  measurementId: "G-34GKSH3L21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default auth

