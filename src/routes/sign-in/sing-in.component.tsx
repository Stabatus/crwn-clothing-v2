import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

import { SignUpForm } from '../../component/sign-up-form/sign-up-form.component'

const logGoogleUser = async () => {
  const { user } = await signInWithGooglePopup();
  const userDocRef = await createUserDocumentFromAuth(user);
  console.log({ userDocRef });

}

export const SignIn = () => {

  return (
    <>
      <div>
        <button onClick={logGoogleUser}>Sign Up</button>
      </div>
      <SignUpForm />
    </>
  )
};
