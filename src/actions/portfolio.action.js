import axios from "../helpers/axios";
import { productConstants } from "./constants";
import { API } from "urlConfig";

const baseURL = API;

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
export const addPortfolio = (form, portfolio_images, portfolio_tags) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.ADD_PORTFOLIO_REQUEST });
      const res = await axios.post(`${baseURL}portfolio/create`, form);
      const portfolioId = res.data.portfolioId;
      if (res.status === 201) {
        dispatch({ type: productConstants.ADD_PORTFOLIO_SUCCESS });
        dispatch(addPortfolioImages(portfolioId, portfolio_images));
        dispatch(addPortfolioTags(portfolioId, portfolio_tags));
      } else {
        dispatch({ type: productConstants.ADD_PORTFOLIO_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatedSortedPortfolio = (items) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.SORT_PORTFOLIO_REQUEST });
      const res = await axios.post(`${baseURL}portfolio/updateSorting`, {items});
      if (res.status === 201) {
        dispatch({ type: productConstants.SORT_PORTFOLIO_SUCCESS });
        dispatch(getPortfolios());
      } else {
        dispatch({ type: productConstants.SORT_PORTFOLIO_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPortfolioImages = (portfolioId, portfolio_images) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.ADD_PORTFOLIO_IMAGES_REQUEST });

      const imagesform = new FormData();
      imagesform.append("portfolioId", portfolioId);
      portfolio_images.forEach((file) => {
        imagesform.append('images', file);
      });

      const res = await axios.post(`${baseURL}portfolio/create/portfolioImages`, imagesform);
      if (res.status === 201) {
        dispatch({ type: productConstants.ADD_PORTFOLIO_IMAGES_SUCCESS });
        dispatch(getPortfolios());
      } else {
        dispatch({ type: productConstants.ADD_PORTFOLIO_IMAGES_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPortfolioTags = (portfolioId, portfolio_tags) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.ADD_PORTFOLIO_TAGS_REQUEST });

      const imagestag = {
        portfolioId: portfolioId,
        tags: portfolio_tags.map(tag => ({ tag }))
      };

      const res = await axios.post(`${baseURL}portfolio/create/portfolioTags`, imagestag);
      if (res.status === 201) {
        dispatch({ type: productConstants.ADD_PORTFOLIO_TAGS_SUCCESS });
        dispatch(getPortfolios());
      } else {
        dispatch({ type: productConstants.ADD_PORTFOLIO_TAGS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// new action
export const deletePortfolioById = (portfolioId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`${baseURL}portfolio/deletePortfolioById`, {
        data: { portfolioId },
      });
      dispatch({ type: productConstants.DELETE_PORTFOLIO_BY_ID_REQUEST });
      if (res.status === 200) {
        dispatch({ 
          type: productConstants.DELETE_PORTFOLIO_BY_ID_SUCCESS,
          payload: { portfolioId },
        });
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
