import { initializeApp } from 'firebase/app';
import { getAuth, 
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut, 
        onAuthStateChanged,
    } from 'firebase/auth';
import {
        getFirestore,
        doc,
        getDoc,
        setDoc,
        collection,
        writeBatch,
        query,
        getDocs
    } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCt6H1aQm8bwHt8A-wlVbYDydAXo5-4iRM",
  authDomain: "crwn-db-ba545.firebaseapp.com",
  projectId: "crwn-db-ba545",
  storageBucket: "crwn-db-ba545.appspot.com",
  messagingSenderId: "134645572633",
  appId: "1:134645572633:web:9aeb7a7309916cebf63688",
  measurementId: "G-1FNKHNXNK4"
};

// Initialize Firebase
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
        await setDoc(userDocRef, {
          displayName,
          email, 
          createdAt,
          ...additionalInformation
        });
    } catch(error) {
      console.log(`error creating the user ${error.message}`);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmaiAndPassword = async (email, password) => {
  if(!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password)
};

export const signInAuthUserWithEmaiAndPassword = async (email, password) => {
  if(!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password)
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  
  objectsToAdd.forEach((object) => {
     const docRef = doc(collectionRef, object.title.toLowerCase());
     batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async (collectionKey) => {
  const collectionRef = collection(db, collectionKey);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const catergoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] =items;
    return acc;
  }, {});

  return catergoryMap;
}