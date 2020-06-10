import { SET_ERROR } from '../actions/errorMessage';

const initialState = null;
// errorMessage reducer
const errorMessage = (state = initialState, action) => {
    switch(action.type) {
        case SET_ERROR:
            return action.payload;
        default:
            return state;
    }
};

export default errorMessage;
