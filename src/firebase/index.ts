// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  Firestore,
  where,
  getDoc,
  doc,
} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log('initializing firebase')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

const getUserByWalletId = async (walletId: string) => {
  const docRef = doc(db, 'users', walletId)
  const snap = await getDoc(docRef)

  if (snap.exists()) {
    console.log('snap exists ', snap.data())
    return snap.data()
  } else {
    console.log('not founbd')
    return undefined
  }
}

export { app, getUserByWalletId }
