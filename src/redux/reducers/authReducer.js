import { ERROR_SIGNUP_WITH_EMAIL, ERROR_WITH_LOGIN, LOGIN_WITH_EMAIL, LOGOUT_SUCCESS, SIGNUP_WITH_EMAIL, SIGNUP_WITH_GOOGLE } from "../actions/authAction";

const initState = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    error:null
};

export const authReducer = (state=initState,action) =>{
    switch(action.type){
     case SIGNUP_WITH_EMAIL:
     case LOGIN_WITH_EMAIL:   
        return {...state,user:action.payload}  
     case ERROR_SIGNUP_WITH_EMAIL:
        return {...state, error:action.payload}  
     case SIGNUP_WITH_GOOGLE:
        return {...state,user:action.payload}  
      case ERROR_WITH_LOGIN:
         return {...state,error:action.payload}    
     case LOGOUT_SUCCESS:
        return{...state,user:null}     
        default:
            return state;
    }
}