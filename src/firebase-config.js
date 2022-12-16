import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_API_KEY}`,
  authDomain: "tours-and-travels-20af4.firebaseapp.com",
  projectId: "tours-and-travels-20af4",
  storageBucket: "tours-and-travels-20af4.appspot.com",
  messagingSenderId: "584254989625",
  appId: "1:584254989625:web:401ff2f2455c0c894df4e8",
  measurementId: "G-T1T1WQE48W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
