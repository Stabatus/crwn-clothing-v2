import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";
import {
  getfirestore,
  doc,
  getDoc,
  setDoc,
  getFirestore,
} from "firebase/firestore";

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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

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
