import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtaDGREiEyOvVHtKBHpivBHfg6VSRs8F0",
  authDomain: "quibil.firebaseapp.com",
  projectId: "quibil",
  storageBucket: "quibil.firebasestorage.app",
  messagingSenderId: "182347198135",
  appId: "1:182347198135:web:642f97e87ef1fe371b6732",
  measurementId: "G-6QR3YWTGYW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);