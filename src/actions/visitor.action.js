import { visitorConstants } from "./constants";
import axios from "../helpers/axios";
import { API } from "urlConfig";

const baseURL = API;

export const visitor = () => {
    return async dispatch => {
        dispatch({ type: visitorConstants.GET_VISITORS_REQUEST });
        const res = await axios.get(`${baseURL}/visitor-count`);
        const visitor = res.data;
        if(res.status === 200){
            dispatch({ type: visitorConstants.GET_VISITORS_SUCCESS,
                payload: {
                    visitor
                }
            });
        }else{
            dispatch({
                type: visitorConstants.GET_VISITORS_FAILURE
            });
        }
    }
}

export const getPortfolioVisitors = () => {
    return async dispatch => {
        dispatch({ type: visitorConstants.GET_ALL_PORTFOLIO_VISITORS_REQUEST });
        const res = await axios.get(`${baseURL}/portfolio/Top-portfolios`);
        const visitor = res.data;
        if(res.status === 200){
            dispatch({ type: visitorConstants.GET_ALL_PORTFOLIO_VISITORS_SUCCESS,
                payload: {
                    visitor
                }
            });
        }else{
            dispatch({
                type: visitorConstants.GET_ALL_PORTFOLIO_VISITORS_FAILURE
            });
        }
    }
}