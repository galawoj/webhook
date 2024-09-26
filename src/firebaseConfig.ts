import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA466O4PQkKU-unGUETyYPpjiEnSf5CVK8",
    authDomain: "voucherifywebhook-3205f.firebaseapp.com",
    databaseURL: "https://voucherifywebhook-3205f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "voucherifywebhook-3205f",
    storageBucket: "voucherifywebhook-3205f.appspot.com",
    messagingSenderId: "765195820664",
    appId: "1:765195820664:web:47bfef8a6cc9406837578d"
  };

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
