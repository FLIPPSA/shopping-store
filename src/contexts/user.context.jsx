import { createContext, useState, useEffect } from "react";
import { onAuthStateChangeListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// as the actual value you want to access 
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

export const UserProvider = ({ children }) => { // This Provider allows any of its child components to access the values inside of its useState
  const [ currentUser, setCurrentUser ] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => { // The moment that this listener mounts it checks the authentication state automatically
      if(user){
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
      console.log(user)
    });
    return unsubscribe; // clean up phase
  }, []);

  return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
};