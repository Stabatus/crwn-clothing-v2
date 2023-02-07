import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const logGoogleUser = async () => {
  const { user } = await signInWithGooglePopup();
  const userDocRef = await createUserDocumentFromAuth(user);
  console.log({ userDocRef });

}

export const SignIn = () => {
  return (
    <div>
      <button onClick={logGoogleUser}>Sign Up</button>
    </div>
  )
};
