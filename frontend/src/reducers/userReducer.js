import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    CLEAR_ERRORS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REGISTER_REQUEST,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from "../constants/userConstants";


export const userReducer = (state = {
    user: {},
    // isAuthenticated:false,
}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                    isAuthenticated: false,
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                    loading: false,
                    isAuthenticated: true,
                    userName: action.payload.name,

            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            };

        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                    isAuthenticated: false,
                    user: null,
                    error: action.payload,
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                    isAuthenticated: false,
                    user: null,
                    error: action.payload,
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
            default:
                return state;
    }
};