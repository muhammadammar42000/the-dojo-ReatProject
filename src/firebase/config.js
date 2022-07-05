import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBomGKfvT8AIxsmWCMiX_NdiL_q6fZSQIY",
    authDomain: "thedojosite-reactproject.firebaseapp.com",
    projectId: "thedojosite-reactproject",
    storageBucket: "thedojosite-reactproject.appspot.com",
    messagingSenderId: "112740018557",
    appId: "1:112740018557:web:b670f61444106df7804414"
};

//initialize firebase
firebase.initializeApp(firebaseConfig)

//initialize firebase services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

//timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }