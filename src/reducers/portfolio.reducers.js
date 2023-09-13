import { productConstants } from "../actions/constants";

const initialState = {
    portfolios: [],
    loading: false,
};

export default (state = initialState, action) => {
    switch(action.type){
        case productConstants.ADD_PORTFOLIO_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.ADD_PORTFOLIO_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case productConstants.ADD_PORTFOLIO_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
        case productConstants.UPDATE_PORTFOLIO_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.UPDATE_PORTFOLIO_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case productConstants.UPDATE_PORTFOLIO_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
        case productConstants.SORT_PORTFOLIO_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.SORT_PORTFOLIO_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case productConstants.SORT_PORTFOLIO_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
        case productConstants.GET_ALL_PORTFOLIOS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_ALL_PORTFOLIOS_SUCCESS:
            state = {
                ...state,
                portfolios: action.payload.portfolios,
                loading: false
            }
            break;
        case productConstants.GET_ALL_PORTFOLIOS_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
        case productConstants.DELETE_PORTFOLIO_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.DELETE_PORTFOLIO_BY_ID_SUCCESS:
            state = {
                ...state,
                portfolios: state.portfolios.filter(portfolio => portfolio.id !== action.payload.portfolioId),
                loading: false
            }
            break;
        case productConstants.DELETE_PORTFOLIO_BY_ID_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
    }

    return state;
}