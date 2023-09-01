// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDEBJ_wPNiZYly9yq4mbSLXr5CNijcX7wk",
  authDomain: "goit-native-391116.firebaseapp.com",
  databaseURL: "https://goit-native-391116.firebaseapp.com",
  projectId: "goit-native-391116",
  storageBucket: "goit-native-391116.appspot.com",
  messagingSenderId: "179841763827",
  appId: "1:179841763827:web:261e4a555c7d7e03e06a86",
  measurementId: "G-C0MBXL0VH3",
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
