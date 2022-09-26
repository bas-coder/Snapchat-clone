import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBzaW74BW2kbt3mrbhZ6z7pP9435uTZFcA",
  authDomain: "snapchat-clone-yt-f8d35.firebaseapp.com",
  projectId: "snapchat-clone-yt-f8d35",
  storageBucket: "snapchat-clone-yt-f8d35.appspot.com",
  messagingSenderId: "637897185900",
  appId: "1:637897185900:web:debef11ce9510e4cd61649"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();
const storageRef = storage.ref();

const provider  = new firebase.auth.GoogleAuthProvider();

export {db, auth, storage, storageRef, provider};
