import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();
export const useAuth = ()=>{
    return useContext(AuthContext)
}
const provider = new GoogleAuthProvider()

//authProvider
export const AuthProvide = ({children})=>{
    //Your auth login here
    const [currentUser,setCurrentUser] = useState(null)
    const [loading,setLoading] = useState(true);
    //register a user
    const registerUser = async(email,password)=>{
        return await createUserWithEmailAndPassword(auth,email,password)
    }
    //login a user
    const loginUser = async(email,password)=>{
        return await signInWithEmailAndPassword(auth,email,password)
    }
    //sign up with google
    const signInwithGoogle = async()=>{
        return signInWithPopup(auth,provider)
    }
    //logout the user
    const logout = ()=>{
        return signOut(auth)
    }
    //manage user
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            setLoading(false)
            if(user){
                const {email,displayName,photoURL} = user;
                const userData = {
                    email,username:displayName,photo:photoURL
                }
            }

        })
        return ()=> unsubscribe()
    },[])
    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInwithGoogle,
        logout
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
    
}
 
