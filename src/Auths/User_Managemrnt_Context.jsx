import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../FirebaseStuffs/Frb';
export const ContextProvider = createContext(null)
const User_Managemrnt_Context = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const emailPasswordLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const emailPasswordRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [])


    const data = { user, loading, googleLogin, logOut, emailPasswordLogin, emailPasswordRegister }
    return (
        <ContextProvider.Provider value={data}>
            {children}
        </ContextProvider.Provider>
    );
};

export default User_Managemrnt_Context;