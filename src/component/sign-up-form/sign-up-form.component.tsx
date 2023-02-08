
import { createRef, useState } from 'react';
import './sing-up-form.styles.scss';

import { ErrorFireBase, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import { FormInput } from '../form-input/form-input.component';
import { Button } from '../button/button.component';

interface FormField {
  displayName: string;
  email: string;
  password: string;
}

interface Refs {
  name: React.RefObject<HTMLInputElement>,
  email: React.RefObject<HTMLInputElement>,
  password: React.RefObject<HTMLInputElement>,
  confirmPassword: React.RefObject<HTMLInputElement>
}

interface Error {
  code: Partial<ErrorFireBase>;
}

const useSingUpForm = () => {
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  const refs: Refs = {
    name: createRef<HTMLInputElement>(),
    email: createRef<HTMLInputElement>(),
    password: createRef<HTMLInputElement>(),
    confirmPassword: createRef<HTMLInputElement>()
  }

  const clearnForm = () => {
    for (const input in refs) {
      refs[input as keyof Refs].current!.value = '';
    }
    setIsPasswordConfirmed(false);
  }

  const signUpFormInDatabase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameInputValue = refs.name.current!.value;
    const emailInputValue = refs.email.current!.value;
    const passwordInputValue = refs.password.current!.value;

    const values = [nameInputValue, emailInputValue, passwordInputValue];
    if (values.includes('')) return;

    const formFieldSubmited: FormField = {
      displayName: nameInputValue,
      email: emailInputValue,
      password: passwordInputValue
    }
    try {
      const user = await createAuthUserWithEmailAndPassword(formFieldSubmited);
      if (!user) throw Error("Erreur inconnue");
      await createUserDocumentFromAuth({ ...user, displayName: formFieldSubmited.displayName });

      clearnForm();

    } catch (error) {
      if ((error as Error).code === ErrorFireBase["EmailExist"]) {
        alert('Email already exist');
        console.error(error);
      }
    }
  }

  const handleChange = () => {
    const { password, confirmPassword } = refs;

    const passwordValue = password.current!.value;
    const passwordConfirmValue = confirmPassword.current!.value;

    if (!passwordValue && !passwordConfirmValue) return;

    if (passwordConfirmValue != passwordValue) {
      password.current!.style.borderColor = 'red';
      confirmPassword.current!.style.borderColor = 'red';
      return;
    }

    password.current!.style.borderColor = 'green';
    confirmPassword.current!.style.borderColor = 'green';

    setIsPasswordConfirmed(true);
  }

  return {
    isPasswordConfirmed,
    refs,
    signUpFormInDatabase,
    handleChange
  }
}

export const SignUpForm = () => {

  const {
    isPasswordConfirmed,
    refs,
    signUpFormInDatabase,
    handleChange
  } = useSingUpForm();

  const passwordOptions = {
    type: "password",
    required: true,
    onChange: handleChange
  } as const;

  return (
    <div>
      <h2>Sign up with your email and password</h2>
      <form onSubmit={signUpFormInDatabase}>

        <FormInput
          displayName='Display Name'
          ref={refs.name}
          inputOptions={{
            type: "text",
            required: true,
          }}
        />

        <FormInput
          displayName='Email'
          ref={refs.email}
          inputOptions={{
            type: "email",
            required: true,
          }}
        />

        <FormInput
          displayName='Password'
          ref={refs.password}
          inputOptions={passwordOptions}
        />

        <FormInput
          displayName='Confirmed Password'
          ref={refs.confirmPassword}
          inputOptions={passwordOptions}
        />

        <Button
          buttonOptions={{
            disabled: !isPasswordConfirmed,
            type: 'submit'
          }}
        >Sign Up</Button>
      </form>
    </div>
  )
}