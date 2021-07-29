import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/storage";

// create a web app in fireabse
// then get your app config object from firebase console -> settings
const firebaseConfig = {
  apiKey: "AIzaSyCZkYBWdu4ydAQ-xE-QREb6k7aLnfgvjOo",
  authDomain: "photosprovider.firebaseapp.com",
  projectId: "photosprovider",
  storageBucket: "photosprovider.appspot.com",
  messagingSenderId: "928748219713",
  appId: "1:928748219713:web:e38ac331f1df3a942085c0",
  measurementId: "G-36G4STM7W3",
};

firebase.initializeApp(firebaseConfig);
