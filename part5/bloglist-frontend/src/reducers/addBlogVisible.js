import { SET_VISIBILITY } from '../actions/addBlogVisible';

const initialState = false;
// addBlogVisible reducer.
const addBlogVisible = (state = initialState, action) => {
    switch(action.type) {
        case SET_VISIBILITY:
            return action.payload;
        default:
            return state;
    }
};

export default addBlogVisible;