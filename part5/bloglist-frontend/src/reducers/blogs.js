import { INITIALIZE_BLOGS, ADD_BLOG, DELETE_BLOG, ADD_LIKE } from '../actions/blogs';

const initialState = [];
const blogs = (state = initialState, action) => {
    switch(action.type) {
        case INITIALIZE_BLOGS:
            return [...action.blogs];
        case ADD_BLOG:
            return [...state, action.blog];
        case DELETE_BLOG:
            return state.filter(blog => blog.id !== action.id);
        case ADD_LIKE:
            return state.map(blog => blog.id === action.id ? {...blog, likes: blog.likes + 1} : blog)
        default:
            return state;
    }
};

export default blogs;