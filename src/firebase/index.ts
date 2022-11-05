// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  Firestore,
  where,
  getDoc,
  doc,
  setDoc,
} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

console.log('initializing firebase');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const getUserByWalletId = async (walletId: string) => {
  const docRef = doc(db, 'users', walletId);
  const snap = await getDoc(docRef);

  if (snap.exists()) {
    console.log('snap exists ', snap.data());
    return snap.data();
  } else {
    console.log('not founbd');
    return undefined;
  }
};

const getUsersBySearhTerm = async (search: string) => {
  if (search.startsWith('0x')) {
    const user = await getUserByWalletId(search);
    return [user];
  } else {
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    const users: any[] = [];
    querySnapshot.forEach(doc => {
      users.push({ walletId: doc.id, ...doc.data() });
    });
    return users.filter((user: any) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }
};

const storage = getStorage(app);

const uploadProfilePic = async (file: any, walletId: string) => {
  const picRef = ref(storage, `profile_pic_${walletId}`);
  const res = await uploadBytes(picRef, file);
  console.log('res from upload file ', res);
  const url = await getProfilePicUrl(walletId);
  console.log('url for ppf ', url);
  return url;
};

const getProfilePicUrl = async (walletId: string) => {
  const picRef = ref(storage, `profile_pic_${walletId}`);
  const url = await getDownloadURL(picRef);
  return url;
};

const createUser = async (
  walletId: string,
  name: string,
  bio: string,
  profilePicture: string
) => {
  console.log('creatUser ', walletId, name, bio, profilePicture);
  await setDoc(doc(db, 'users', walletId), {
    name,
    bio,
    profilePicture,
  });
};

export {
  app,
  getUserByWalletId,
  getUsersBySearhTerm,
  uploadProfilePic,
  getProfilePicUrl,
  createUser,
};
