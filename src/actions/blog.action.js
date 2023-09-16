import axios from "../helpers/axios";
import { blogConstants } from "./constants";
import { API } from "urlConfig";

const baseURL = API;

export const getBlogs = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: blogConstants.GET_ALL_BLOGS_REQUEST });
      const res = await axios.get(`${baseURL}blog/getBlogs`);
      if (res.status === 200) {
        const { blogs } = res.data;
        dispatch({
          type: blogConstants.GET_ALL_BLOGS_SUCCESS,
          payload: { blogs },
        });
      } else {
        dispatch({ type: blogConstants.GET_ALL_BLOGS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addBlog = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: blogConstants.ADD_BLOG_REQUEST });
      const res = await axios.post(`${baseURL}blog/create`, form);
      if (res.status === 201) {
        dispatch({ type: blogConstants.ADD_BLOG_SUCCESS });
        dispatch(getBlogs());
      } else {
        dispatch({ type: blogConstants.ADD_BLOG_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateBlog = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: blogConstants.UPDATE_BLOG_REQUEST });
      const res = await axios.post(`${baseURL}blog/update`, form);
      if (res.status === 200) {
        dispatch({ type: blogConstants.UPDATE_BLOG_SUCCESS });
        dispatch(getBlogs());
      } else {
        dispatch({ type: blogConstants.UPDATE_BLOG_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};


// new action
export const deleteBlogById = (blogId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`${baseURL}blog/deleteBlogById`, {
        data: { blogId },
      });
      dispatch({ type: blogConstants.DELETE_BLOG_BY_ID_REQUEST });
      if (res.status === 200) {
        dispatch({ 
          type: blogConstants.DELETE_BLOG_BY_ID_SUCCESS,
          payload: { blogId },
        });
        dispatch(getBlogs());
      } else {
        const { error } = res.data;
        dispatch({
          type: blogConstants.DELETE_BLOG_BY_ID_FAILURE,
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
