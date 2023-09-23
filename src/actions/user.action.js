import axios from "../helpers/axios";
import { userConstants } from "./constants";
import { API } from "urlConfig";

const baseURL = API;

export const getUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
      const res = await axios.get(`${baseURL}user/getUsers`);
      if (res.status === 200) {
        const { users } = res.data;
        dispatch({
          type: userConstants.GET_ALL_USERS_SUCCESS,
          payload: { users },
        });
      } else {
        dispatch({ type: userConstants.GET_ALL_USERS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const promoteUser = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.PROMOTE_USER_REQUEST });

      if(payload.newRole == 'superAdmin')
      {
        const res = await axios.post(`${baseURL}user/promoteToSuperAdmin`, payload);
        if (res.status === 200) {
          dispatch({ type: userConstants.PROMOTE_USER_SUCCESS });
          dispatch(getUsers());
        }
      } else {
        const res = await axios.post(`${baseURL}user/promoteToAdmin`, payload);
        if (res.status === 200) {
          dispatch({ type: userConstants.PROMOTE_USER_SUCCESS });
          dispatch(getUsers());
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 403) {
          
          const { message } = error.response.data;

          dispatch({ type: userConstants.PROMOTE_USER_FAILURE, payload: { error: message } });

        } else {

          dispatch({ type: userConstants.PROMOTE_USER_FAILURE, error: 'An error occurred while processing your request.' });
        }
      } else if (error.request) {

        dispatch({ type: userConstants.PROMOTE_USER_FAILURE, error: 'Network error. Please check your internet connection.' });
      } else {

        dispatch({ type: userConstants.PROMOTE_USER_FAILURE, error: 'An error occurred while processing your request.' });
      }
    }
  };
};

export const deleteUserById = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`${baseURL}user/deleteUserById`, {
        data: { userId },
      });
      dispatch({ type: userConstants.DELETE_USER_BY_ID_REQUEST });
      if (res.status === 200) {
        dispatch({ 
          type: userConstants.DELETE_USER_BY_ID_SUCCESS,
          payload: { userId },
        });
        dispatch(getUsers());
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.DELETE_USER_BY_ID_FAILURE,
          payload: {
            error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
