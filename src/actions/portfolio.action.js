const baseURL = "http://localhost:5000/api/";

import axios from "../helpers/axios";
import { productConstants } from "./constants";

// new action
export const getPortfolios = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_ALL_PORTFOLIOS_REQUEST });
      const res = await axios.get(`${baseURL}portfolio/getPortfolios`);

      if (res.status === 200) {
        const { portfolios } = res.data;
        dispatch({
          type: productConstants.GET_ALL_PORTFOLIOS_SUCCESS,
          payload: { portfolios },
        });
      } else {
        dispatch({ type: productConstants.GET_ALL_PORTFOLIOS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// modified actrion
export const addProduct = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.ADD_PORTFOLIO_REQUEST });
      const res = await axios.post(`product/create`, form);
      if (res.status === 201) {
        dispatch({ type: productConstants.ADD_PORTFOLIO_SUCCESS });
        dispatch(getPortfolios());
      } else {
        dispatch({ type: productConstants.ADD_PORTFOLIO_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// new action
export const deleteProductById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`product/deleteProductById`, {
        data: { payload },
      });
      dispatch({ type: productConstants.DELETE_PORTFOLIO_BY_ID_REQUEST });
      if (res.status === 202) {
        dispatch({ type: productConstants.DELETE_PORTFOLIO_BY_ID_SUCCESS });
        dispatch(getPortfolios());
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.DELETE_PORTFOLIO_BY_ID_FAILURE,
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
