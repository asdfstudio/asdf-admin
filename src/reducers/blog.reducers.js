import { blogConstants } from "../actions/constants";

const initialState = {
    blogs: [],
    loading: false,
};

export default (state = initialState, action) => {
    switch(action.type){
        case blogConstants.ADD_BLOG_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case blogConstants.ADD_BLOG_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case blogConstants.ADD_BLOG_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
        case blogConstants.UPDATE_BLOG_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case blogConstants.UPDATE_BLOG_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case blogConstants.UPDATE_BLOG_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
        case blogConstants.GET_ALL_BLOGS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case blogConstants.GET_ALL_BLOGS_SUCCESS:
            state = {
                ...state,
                blogs: action.payload.blogs,
                loading: false
            }
            break;
        case blogConstants.GET_ALL_BLOGS_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
        case blogConstants.DELETE_BLOG_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case blogConstants.DELETE_BLOG_BY_ID_SUCCESS:
            state = {
                ...state,
                blogs: state.blogs.filter(blog => blog.id !== action.payload.blogId),
                loading: false
            }
            break;
        case blogConstants.DELETE_BLOG_BY_ID_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
    }

    return state;
}