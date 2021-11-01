// import * as firebase from 'firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAmf7ypDfGh8SqHn84rCZx3L2IXiJildwI',
  authDomain: 'ecommerce-bcfa1.firebaseapp.com',
  projectId: 'ecommerce-bcfa1',
  storageBucket: 'ecommerce-bcfa1.appspot.com',
  messagingSenderId: '414172165579',
  appId: '1:414172165579:web:35811d8c6316ec9f78f24e',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
