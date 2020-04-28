import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "mybeta-c2482.firebaseapp.com",
  databaseURL: "https://mybeta-c2482.firebaseio.com",
  projectId: "mybeta-c2482",
  storageBucket: "mybeta-c2482.appspot.com",
  messagingSenderId: "164743294006",
  appId: "1:164743294006:web:07dd3fb9d8f3f2c0743c97",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export { storage, firebase as default };
