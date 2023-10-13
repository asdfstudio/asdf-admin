import { combineReducers } from 'redux';
import authReducer from './auth.reducers';
import portfolioReducers from './portfolio.reducers';
import blogReducers from './blog.reducers';
import userReducers from './user.reducers';
import visitorReducers from './visitor.reducers';

const rootReducer = combineReducers({
    auth: authReducer,
    portfolio: portfolioReducers,
    blog: blogReducers,
    user: userReducers,
    visitor: visitorReducers
});

export default rootReducer;