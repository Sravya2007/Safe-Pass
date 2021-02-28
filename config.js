import * as firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyCqn_HqOPEl9m_wMOOuh8PmLm2OqkOVbpg",
    authDomain: "safe-pass-1353a.firebaseapp.com",
    databaseURL: "https://safe-pass-1353a-default-rtdb.firebaseio.com",
    projectId: "safe-pass-1353a",
    storageBucket: "safe-pass-1353a.appspot.com",
    messagingSenderId: "135908231489",
    appId: "1:135908231489:web:5b7584c7963b19e21ab9c0",
    measurementId: "G-FXHHHME4E5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();