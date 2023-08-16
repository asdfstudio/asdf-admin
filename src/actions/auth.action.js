import axios from "axios";
import { authConstants } from "./constants";

export const login = (user) => {

    console.log("Login user:", user)

    return async (dispatch) => {

        dispatch({ type: authConstants.LOGIN_REQUEST });
        const res = await axios.post(`http://localhost:5000/api/login`, {
            ...user
        });

        if(res.status === 200){
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }else{
            if(res.status === 400){
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const signup = (user) => {

    console.log("Signup user:", user)

    return async (dispatch) => {

        dispatch({ type: authConstants.SIGNUP_REQUEST });
        const res = await axios.post(`http://localhost:5000/api/signup`, {
            ...user
        });

        if(res.status === 201){
            const { message } = res.data;
            dispatch({
                type: authConstants.SIGNUP_SUCCESS,
                payload: {message}
            });
        }else{
            if(res.status === 400){
                dispatch({
                    type: authConstants.SIGNUP_FAILURE,
                    payload: { error: res.data.error }
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
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Failed to login' }
            });
        }
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch({ type: authConstants.LOGOUT_REQUEST });
        const res = await axios.post(`http://localhost:5000/api/logout`);

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