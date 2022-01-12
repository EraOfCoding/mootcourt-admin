import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

let firebaseConfig = {
    apiKey: "AIzaSyAj8ecDfljqW_rMgftk76p09YzGlFMLjn4",
    authDomain: "moot-court-62aca.firebaseapp.com",
    projectId: "moot-court-62aca",
    storageBucket: "moot-court-62aca.appspot.com",
    messagingSenderId: "441674699394",
    appId: "1:441674699394:web:411e9847f1e2c8c03f1a9b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

export { db, firebase }