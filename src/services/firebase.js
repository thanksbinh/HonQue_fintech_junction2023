import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCZZr-ivCVlHfeYYjLUQelx_rid7yH-s5Y",
  authDomain: "groupchat-3698d.firebaseapp.com",
  projectId: "groupchat-3698d",
  storageBucket: "groupchat-3698d.appspot.com",
  messagingSenderId: "878914156387",
  appId: "1:878914156387:web:3424cebbaccc7e77bb4556",
  measurementId: "G-Q0VYRCTFKT"
};

const fire = firebase.initializeApp(firebaseConfig)

const db = fire.firestore()
const auth = fire.auth()

export { db, auth, firebase }
export default firebase
