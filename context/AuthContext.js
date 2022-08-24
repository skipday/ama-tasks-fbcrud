import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'
import { createUser } from '../helpers/db'
import { isMobile } from 'react-device-detect'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    
    const googleSignIn = () => {
        setLoading(true)
        const provider = new GoogleAuthProvider()
        if(isMobile) { signInWithRedirect(auth, provider); return }
        else { signInWithPopup(auth, provider); return }
    }

    const logOut = () => {
        signOut(auth)
        setUser(null)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(!currentUser?.uid) return
            createUser(currentUser)
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    },[])

    return <AuthContext.Provider value={{ googleSignIn, logOut, user }}>{children}</AuthContext.Provider>
}

export const UserAuth = () => {
    return useContext(AuthContext)
}