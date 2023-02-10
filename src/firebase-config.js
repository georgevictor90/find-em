import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2vLDiwE58nroTAfes8mkWxY-9Zt9hTew",
  authDomain: "find-em-c2fbe.firebaseapp.com",
  projectId: "find-em-c2fbe",
  storageBucket: "find-em-c2fbe.appspot.com",
  messagingSenderId: "545079602446",
  appId: "1:545079602446:web:01ac944d7f2cef3c03bb5f",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage();
