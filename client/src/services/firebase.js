import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCksP0nulAu8VXsbTeoNm6V1GfUaxrlwvo",
  authDomain: "fintechgroup-794fc.firebaseapp.com",
  projectId: "fintechgroup-794fc",
  storageBucket: "fintechgroup-794fc.appspot.com",
  messagingSenderId: "1092194090012",
  appId: "1:1092194090012:web:4c43a3a340f7605e1cf3d9",
  measurementId: "G-1TCX7M52MH"
};

const fire = firebase.initializeApp(firebaseConfig)

const db = fire.firestore()
const auth = fire.auth()

export { db, auth, firebase }
export default firebase
