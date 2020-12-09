import firebase from 'firebase';
require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyDvRrOy9MyuSwv8u5VW0BhW2oXQhN7eX5A",
    authDomain: "vue-shop-88.firebaseapp.com",
    databaseURL: "https://vue-shop-88.firebaseio.com",
    projectId: "vue-shop-88",
    storageBucket: "vue-shop-88.appspot.com",
    messagingSenderId: "894626607897",
    appId: "1:894626607897:web:b7f8f3cc61cacde2498b88",
    measurementId: "G-C5WMHQ5RVK"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  export{fb,db};

  firebase.analytics();