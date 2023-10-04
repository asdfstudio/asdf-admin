import { authConstants } from "../actions/constants";

const initState = {
    token: null,
    user: {
        name: '',
        email: ''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: '',
    visitor: [],
};

export default (state = initState, action) => {

    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
                loading: true
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
                loading: false
            }
            break;
        case authConstants.LOGIN_FAILURE:
        state = {
            ...state,
            error: action.payload.message,
            loading: false
        }
        case authConstants.LOGIN_AUTH_FAILURE:
        state = {
            ...state,
            // error: action.payload.error,
            loading: false
        }
        break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;

        case authConstants.SIGNUP_REQUEST:
            state = {
                ...state,
                authenticating: true,
                loading: true,
            }
            break;
        case authConstants.SIGNUP_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                message: action.payload.message,
                authenticate: true,
                authenticating: false,
                loading: false,
            }
            break;
        case authConstants.SIGNUP_FAILURE:
        state = {
            ...state,
            error: action.payload.message,
            loading: false
        }
        break;
        case authConstants.UPDATE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.UPDATE_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                loading: false
            }
            break;
        case authConstants.UPDATE_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;

        case authConstants.UPDATE_PASSWORD_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;

        case authConstants.UPDATE_PASSWORD_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case authConstants.VISITOR_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.VISITOR_SUCCESS:
            state = {
                ...state,
                visitor: action.payload.visitor,
                loading: false
            }
            break;
        case authConstants.VISITOR_FAILURE:
            state = {
                ...state,
                loading: false
            }
    }


    return state;
}