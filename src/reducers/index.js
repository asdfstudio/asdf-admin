import { combineReducers } from 'redux';
import authReducer from './auth.reducers';
import portfolioReducers from './portfolio.reducers';
import blogReducers from './blog.reducers';

const rootReducer = combineReducers({
    auth: authReducer,
    portfolio: portfolioReducers,
    blog: blogReducers
});

export default rootReducer;