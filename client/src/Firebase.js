// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp15F6FUqf2av9CmI5j_Cvz-DFzlSYHjQ",
  authDomain: "social-media-app-eed85.firebaseapp.com",
  projectId: "social-media-app-eed85",
  storageBucket: "social-media-app-eed85.appspot.com",
  messagingSenderId: "377515730409",
  appId: "1:377515730409:web:3aba71e321afd314829778",
  measurementId: "G-0LSWH8R4SR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // eslint-disable-line
