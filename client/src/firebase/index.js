import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDEvpKmxR8uFEXc4YMqOIJLcEVhnA-lnoI",
    authDomain: "development-d831d.firebaseapp.com",
    projectId: "development-d831d",
    storageBucket: "development-d831d.appspot.com",
    messagingSenderId: "403564381464",
    appId: "1:403564381464:web:5c6436cec65a2fa93fca6d",
    measurementId: "G-CF99QJ5D0E"
  };
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();
  
export {storage, firebase as default};
  