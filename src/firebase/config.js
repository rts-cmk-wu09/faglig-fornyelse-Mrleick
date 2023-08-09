import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwbJ9hhaVfloQTWLj7aGRUnxF4_eghYMM",
  authDomain: "jespers-chat-8b470.firebaseapp.com",
  projectId: "jespers-chat-8b470",
  storageBucket: "jespers-chat-8b470.appspot.com",
  messagingSenderId: "53950004313",
  appId: "1:53950004313:web:397fb34ea5a53f601a4548",
};

firebase.initializeApp(firebaseConfig); // Initialize the app directly
const auth = firebase.auth();

export { auth };
