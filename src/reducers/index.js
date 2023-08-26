import { combineReducers } from 'redux';
import authReducer from './auth.reducers';
import portfolioReducers from './portfolio.reducers';

const rootReducer = combineReducers({
    auth: authReducer,
    portfolio: portfolioReducers
});

export default rootReducer;