import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from '../action/types';

const initialState = {
    Token: localStorage.getItem("Token"),
    IsAuth: false,
    Loading: false,
    UserData: null
};
export default (state = initialState, action) => {
    switch(action.type){
        case USER_LOADED:
            return{
                ...state,
                IsAuth: true,
                Loading: false,
                UserData: action.payload
            };
        
        case USER_LOADING:
            return{
                ...state,
                Loading: true
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            
            return{
                ...state,
                ...action.payload,
                Token: localStorage.setItem("Token", action.payload.token),
                Loading: false,
                IsAuth: true,

            };
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        return{
            ...state,
            Token: null,
            IsAuth: false,
            Loading: false,
            UserData: null
            };
        default:
            return state;
    };
};