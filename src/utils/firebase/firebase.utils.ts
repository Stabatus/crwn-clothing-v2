import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

const GOOGLE_KEY_API: string = import.meta.env.VITE_GOOGLE_API_KEY;

const firebaseConfig = {
  apiKey: GOOGLE_KEY_API,
  authDomain: "crwn-db-514c7.firebaseapp.com",
  projectId: "crwn-db-514c7",
  storageBucket: "crwn-db-514c7.appspot.com",
  messagingSenderId: "531559553352",
  appId: "1:531559553352:web:48c7db35c975d8694cfb7d",
} as const;

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth: UserCredential["user"]
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error creating the user", error);
    }
  }

  return userDocRef;
};

interface NewUserFromUserAndPasswordProps {
  email: string;
  password: string;
}

export const createAuthUserWithEmailAndPassword = async ({
  email,
  password,
}: NewUserFromUserAndPasswordProps) => {
  if (!email || !password) return;
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

export enum ErrorFireBase {
  EmailExist = "auth/email-already-in-use",
}
