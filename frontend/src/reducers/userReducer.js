import {LOGIN_FAIL,LOGIN_SUCCESS,LOGIN_REQUEST,CLEAR_ERRORS,REGISTER_FAIL,REGISTER_SUCCESS,REGISTER_REQUEST} from "../constants/userConstants";


export const userReducer = (state = {user:{}},action) =>{
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST: 
            return{
                loading : true,
                isAuthenticated : false,
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:  
        return{
                ...state,
                user : action.payload,
                loading : false,
                isAuthenticated : true,
                userName : action.payload.name,
                
            }
        case LOGIN_FAIL: 
        case REGISTER_FAIL: 
            return{
                ...state,
                loading : false,
                isAuthenticated : false,
                user : null,
                error : action.payload,
            }
        case CLEAR_ERRORS: 
            return{
                ...state,
                error : null,
            }
        default:
            return state;
    }
};

