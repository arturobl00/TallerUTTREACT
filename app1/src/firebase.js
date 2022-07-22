import firebase from "firebase";
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyB-c6QlmA_zB9B3CbpnMuFNe7aH5p5nESc",
    authDomain: "uttcongreso.firebaseapp.com",
    projectId: "uttcongreso",
    storageBucket: "uttcongreso.appspot.com",
    messagingSenderId: "647449974433",
    appId: "1:647449974433:web:85eaddc40c6048117442e0"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export {firebase}