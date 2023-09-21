import { userConstants } from "../actions/constants";

const initialState = {
    users: [],
    loading: false,
};

export default (state = initialState, action) => {
    switch(action.type){
        case userConstants.GET_ALL_USERS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.GET_ALL_USERS_SUCCESS:
            state = {
                ...state,
                users: action.payload.users,
                loading: false
            }
            break;
        case userConstants.GET_ALL_USERS_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;

        case userConstants.PROMOTE_USER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.PROMOTE_USER_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case userConstants.PROMOTE_USER_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
            
        case userConstants.DELETE_USER_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.DELETE_USER_BY_ID_SUCCESS:
            state = {
                ...state,
                users: state.users.filter(user => user.id !== action.payload.userId),
                loading: false
            }
            break;
        case userConstants.DELETE_USER_BY_ID_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
    }

    return state;
}