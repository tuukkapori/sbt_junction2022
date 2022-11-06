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
import { nanoid } from 'nanoid';
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
  console.log('firebase function getting user');
  const docRef = doc(db, 'users', walletId);
  const snap = await getDoc(docRef);
  console.log('snap found');

  if (snap.exists()) {
    console.log('snap exists ', snap.data());
    console.log('returning snap data');
    const snapData = snap.data();
    console.log('snapdata ', snapData);
    return snapData;
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
      if (!doc.data().private){
        users.push({ walletId: doc.id, ...doc.data() });
      }
    });
    console.log(users);

    return users.filter((user: any) =>
      user.name?.toLowerCase().includes(search.toLowerCase())
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

const createUser = async (walletId: string, data: any) => {
  await setDoc(doc(db, 'users', walletId), data);
};

const createCert = async (id: string, data: any) => {
  await setDoc(doc(db, 'certificates', id), data);

  return id;
};

const getCertificateById = async (id: string) => {
  const certRef = doc(db, 'certificates', id);
  const res = await getDoc(certRef);
  if (res.exists()) {
    return res.data();
  } else {
    undefined;
  }
};

const getCerticatesByIds = async (idArray: string[]) => {
  if (idArray && idArray.length > 0) {
    const promises = await Promise.all(
      idArray.map(id => getCertificateById(id))
    );
    // filter possible undefined values
    const certificates = promises.filter(cert => cert);
    return certificates;
  } else {
    return [];
  }
};

export {
  app,
  getUserByWalletId,
  getUsersBySearhTerm,
  uploadProfilePic,
  getProfilePicUrl,
  createUser,
  createCert,
  getCertificateById,
  getCerticatesByIds,
};
