import { initializeApp } from 'firebase/app'; // creates an App instance based on some config 
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDhmPKhg8X1P1QrjZ3AQOsqTNe_pVvYols",
  authDomain: "shopping-store-fc3eb.firebaseapp.com",
  projectId: "shopping-store-fc3eb",
  storageBucket: "shopping-store-fc3eb.appspot.com",
  messagingSenderId: "660017653676",
  appId: "1:660017653676:web:8d08dc3b5a1709b782bc09"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account" // always force user to select an account 
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(); // allows to access database

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt
      });
    } catch (err){
      console.log('error creating the user', err);
    }
  }
  
  return userDocRef;
}