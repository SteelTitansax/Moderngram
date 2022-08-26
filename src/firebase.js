import firebase from "firebase"; 

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBSSxaoGbQGDvGZXkzTKGSUZw4MYm5foW4",
  authDomain: "moderngram-586e0.firebaseapp.com",
  databaseURL: "https://moderngram-586e0.firebaseio.com",
  projectId: "moderngram-586e0",
  storageBucket: "moderngram-586e0.appspot.com",
  messagingSenderId: "877398462022",
  appId: "1:877398462022:web:545a3613a3f58c6cbe8447"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  export {db,auth,storage};