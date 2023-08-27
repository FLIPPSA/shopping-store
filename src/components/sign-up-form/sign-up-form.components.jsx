import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const [ formFields, setFormFields ] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword) {
      return alert('Password and Confirmed Password do not match!');
    } 
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      createUserDocumentFromAuth(user, { displayName });
      resetFormField();
    } catch (err) {
      if(err.code === 'auth/email-already-in-use'){
        alert('Cannot create user! Email already in use');
        resetFormField();
      } else {
        console.log('You made this ERROR while trying to sign up with Email & Password:', err);
        resetFormField();
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target; 
    setFormFields({...formFields, [name]: value}); // spread out object, modify one value
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" type="text" onChange={handleChange} name="displayName" value={displayName} required/>
        <FormInput label="Email" type="email" onChange={handleChange} name="email" value={email} required/>
        <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} autoComplete='hurensohn' required/>
        <FormInput label="Confirm Password" type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} autoComplete='hurensohn' required/>
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;