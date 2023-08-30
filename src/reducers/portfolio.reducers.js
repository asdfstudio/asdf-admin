import { productConstants } from "../actions/constants";

const initialState = {
    portfolios: []
};

export default (state = initialState, action) => {
    switch(action.type){
        case productConstants.GET_ALL_PORTFOLIOS_SUCCESS:
            state = {
                ...state,
                portfolios: action.payload.portfolios
            }
            break;
        case productConstants.DELETE_PORTFOLIO_BY_ID_SUCCESS:
            state = {
                ...state,
                portfolios: state.portfolios.filter(portfolio => portfolio.id !== action.payload.portfolioId)
            }
            break;
    }

    return state;
}