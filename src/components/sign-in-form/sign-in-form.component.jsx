import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import { SignInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const [ formFields, setFormFields ] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const user = await SignInAuthUserWithEmailAndPassword(email, password);
      // resetFormField();
    } catch (err) {
      switch(err.code){
        case 'auth/wrong-password':
          alert('Incorrect password!');
          break;
        case 'auth/user-not-found':
          alert('User does not exist');
          break;
        default:
          console.log(err);
      }
    }
  }

  const SignInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = createUserDocumentFromAuth(user);
  }
  
  const handleChange = (event) => {
    const { name, value } = event.target; 
    setFormFields({...formFields, [name]: value}); // spread out object, modify one value
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSignIn}>
        <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required/>
        <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required/>
        <div className="buttons-container"> 
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={SignInWithGoogle}>Sign In</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;