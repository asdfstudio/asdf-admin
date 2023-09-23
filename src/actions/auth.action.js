import axios from "axios";
import { authConstants } from "./constants";
// import axios from "../helpers/axios";
import { API } from "urlConfig";

const baseURL = API;

export const login = (user) => {
    return async (dispatch) => {
      try {
        dispatch({ type: authConstants.LOGIN_REQUEST });
        const res = await axios.post(`${baseURL}login`, user);
  
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
              token: res.data.token,
              user: res.data.user,
            },
          });
        }
      } catch (error) {
        if (error.response.status === 400) {
            const { message } = error.response.data;
            dispatch({
              type: authConstants.LOGIN_FAILURE,
              payload: { message },
            });
          }
      }
    };
  };

export const updateUser = (user) => {

    return async (dispatch) => {

        dispatch({ type: authConstants.UPDATE_REQUEST });
        const res = await axios.post(`${baseURL}/updateUser`, {
            ...user
        });

        if(res.status === 200){
            const { user } = res.data;
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.UPDATE_SUCCESS,
                payload: {user}
            });
        }else{
            if(res.status === 400){
                dispatch({
                    type: authConstants.UPDATE_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const updatePassword = (password) => {

    return async (dispatch) => {

        dispatch({ type: authConstants.UPDATE_PASSWORD_REQUEST });
        const res = await axios.post(`${baseURL}/updatePassword`, {
            ...password
        });

        if(res.status === 200){
            const { message } = res.data;
            dispatch({
                type: authConstants.UPDATE_PASSWORD_SUCCESS,
                payload: { message }
            });
            dispatch(logout())
        }else{
            if(res.status === 400){
                dispatch({
                    type: authConstants.UPDATE_PASSWORD_FAILURE,
                    payload: { error: message }
                });
            }
        }
    }
}

export const signup = (user) => {
    return async (dispatch) => {
        try {
            dispatch({ type: authConstants.SIGNUP_REQUEST });
            const res = await axios.post(`${baseURL}signup`, user);

            if(res.status === 201){
                const { message } = res.data;
                dispatch({
                    type: authConstants.SIGNUP_SUCCESS,
                    payload: {message}
                });
            }
        } catch (error) {
            if (error.response.status === 400) {
                const { message } = error.response.data;
                dispatch({
                    type: authConstants.SIGNUP_FAILURE,
                    payload: { message },
                });
            }
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }else{
            dispatch({
                type: authConstants.LOGIN_AUTH_FAILURE,
                payload: { error: 'Failed to login' }
            });
        }
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch({ type: authConstants.LOGOUT_REQUEST });
        const res = await axios.post(`${baseURL}/logout`);

        if(res.status === 200){
            localStorage.clear();
            // localStorage.removeItem("token");
            dispatch({ type: authConstants.LOGOUT_SUCCESS });
        }else{
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
}