import axios from 'axios';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from './types';

export const ROOT_URL = "http://localhost:8000/";

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });
    //console.log(getState().User.Loading)
    axios
      .get(ROOT_URL + "api/user/", tokenConfig())
      .then(res => 
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
      )
      .catch(err => dispatch({
        type: AUTH_ERROR,
        payload: err
    }))
};


export const login = ({ username, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password });

    axios.post(ROOT_URL + "api-token-auth/", body, config)
        .then(res => dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        }))
        .catch(err => dispatch({
            type: LOGIN_FAIL,
            payload: err
        }))
}

export const logout = () => {
    return {
      type: LOGOUT_SUCCESS
    };
};

export const signUp = ({ email, username, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, username, password });

    axios.post(ROOT_URL + "api/user/new/", body, config)
        .then(res => dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        }))
        .catch(err => dispatch({
            type: REGISTER_FAIL,
            payload: err
        }))
}

export const tokenConfig = () => {
    const token = localStorage.getItem("Token");
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    if (token) {
        config.headers['Authorization'] = 'token ' + token;
    }
    return config;
};