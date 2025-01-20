// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgSxf_OVsvK47ibYwaHWaU8qxyjX5AI8Y",
  authDomain: "chesscomunity-4091d.firebaseapp.com",
  projectId: "chesscomunity-4091d",
  storageBucket: "chesscomunity-4091d.firebasestorage.app",
  messagingSenderId: "1011585641098",
  appId: "1:1011585641098:web:c62d4d94f8cf8e18b51b73",
  measurementId: "G-V129JKMFJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth to be used in other parts of the app
export { auth };