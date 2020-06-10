import { SET_DETAILS, TOGGLE_DETAILS } from '../actions/showDetails';

const initialState = false;
// showDetails reducer.
const showDetails = (state = initialState, action) => {
    switch(action.type) {
        case SET_DETAILS:
            return action.payload;
        case TOGGLE_DETAILS:
            return !state
        default:
            return state;
    }
};

export default showDetails;