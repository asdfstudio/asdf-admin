import { userConstants } from "../actions/constants";

const initialState = {
    users: [],
    loading: false,
    error: null,
    message: null,
    sendEmail:false,
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
                loading: false,
                error: action.payload.error,
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

        case userConstants.FOTGOT_PASSWORD_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.FOTGOT_PASSWORD_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                sendEmail: true
            }
            break;
        case userConstants.FOTGOT_PASSWORD_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.message,
            }
            break;

        case userConstants.RESET_PASSWORD_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.RESET_PASSWORD_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                sendEmail: true
            }
            break;
        case userConstants.RESET_PASSWORD_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.message,
            }
            break;
    }

    return state;
}