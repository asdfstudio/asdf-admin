import axios from "../helpers/axios";
import { userConstants } from "./constants";
import { API } from "urlConfig";

const baseURL = API;

export const getUsers = (userId) => {
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

export const promoteUser = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.PROMOTE_USER_REQUEST });
      const res = await axios.post(`${baseURL}user/promoteToAdmin`, form);
      if (res.status === 200) {
        dispatch({ type: userConstants.PROMOTE_USER_SUCCESS });
        dispatch(getUsers());
      } else {
        dispatch({ type: userConstants.PROMOTE_USER_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};


// new action
export const deleteUserById = (blogId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`${baseURL}user/deleteUserById`, {
        data: { blogId },
      });
      dispatch({ type: userConstants.DELETE_USER_BY_ID_REQUEST });
      if (res.status === 200) {
        dispatch({ 
          type: userConstants.DELETE_USER_BY_ID_SUCCESS,
          payload: { blogId },
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
