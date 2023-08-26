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
    }

    return state;
}