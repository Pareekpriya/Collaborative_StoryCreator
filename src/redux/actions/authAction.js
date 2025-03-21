import { auth, provider } from "@/firebase/firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"

export const SIGNUP_WITH_EMAIL = "SIGNUP_WITH_EMAIL"
export const ERROR_SIGNUP_WITH_EMAIL = "ERROR_SIGNUP_WITH_EMAIL"
export const SIGNUP_WITH_GOOGLE = "SIGNUP_WITH_GOOGLE";
export const LOGIN_WITH_EMAIL = "LOGIN_WITH_EMAIL"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const ERROR_WITH_LOGIN = "ERROR WITH_LOGIN"

export const signupWithEmail = (email, password,navigate) => async(dispatch) => {
    try{
       const userCredential = await createUserWithEmailAndPassword(auth,email,password)
       const user = userCredential.user
   
       dispatch({type:SIGNUP_WITH_EMAIL,payload:user})
        
       localStorage.setItem("user",JSON.stringify(user))

       navigate("/")
    }catch(err){
        console.error("Error in SIgnup with Email:",err.message)
        dispatch({type:ERROR_SIGNUP_WITH_EMAIL,payload:err.message})
    }
};

export const signupWithGoogle = (navigate) => async(dispatch) =>{
    try{
      const result = await signInWithPopup(auth,provider)
      const user = result.user;
      dispatch({type:SIGNUP_WITH_GOOGLE,payload:user})
      localStorage.setItem("user",JSON.stringify(user))
      navigate("/")
    }catch(err){
        console.error("Error in google signup:",err)
    }
};


export const loginWithEmail = (email,password,navigate)=> async(dispatch) =>{
    try{
       const userCredential = await signInWithEmailAndPassword(auth,email,password)
       const user = userCredential.user
       dispatch({type:LOGIN_WITH_EMAIL, payload:user})

        localStorage.setItem("user",JSON.stringify(user))

       navigate("/")
    }catch(err){
        console.error("Error in Login with EMail:",err)
        dispatch({type:ERROR_WITH_LOGIN,payload:err.message})
    }
}

export const logout = (navigate) => async(dispatch) =>{
    try{
       dispatch({type:LOGOUT_SUCCESS})
       localStorage.removeItem("user")
       navigate('/')
    }catch(err){
        console.error("Error in Logout:",err)
    }
}


