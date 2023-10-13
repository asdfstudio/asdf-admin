import { visitorConstants } from "../actions/constants";

const initState = {
    loading: false,
    visitor: [],
    portfolioVisitor: [],
};

export default (state = initState, action) => {

    switch (action.type) {
        case visitorConstants.GET_VISITORS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case visitorConstants.GET_VISITORS_SUCCESS:
            state = {
                ...state,
                visitor: action.payload.visitor,
                loading: false
            }
            break;
        case visitorConstants.GET_VISITORS_FAILURE:
            state = {
                ...state,
                loading: false
            }
        case visitorConstants.GET_ALL_PORTFOLIO_VISITORS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case visitorConstants.GET_ALL_PORTFOLIO_VISITORS_SUCCESS:
            state = {
                ...state,
                portfolioVisitor: action.payload.visitor,
                loading: false
            }
            break;
        case visitorConstants.GET_ALL_PORTFOLIO_VISITORS_FAILURE:
            state = {
                ...state,
                loading: false
            }
    }


    return state;
}