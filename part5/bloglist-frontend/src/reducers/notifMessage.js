import { SET_NOTIFICATION } from '../actions/notifMessage';

const initialState = null;
// nofitMessage reducer
const notifMessage = (state = initialState, action) => {
    switch(action.type) {
        case SET_NOTIFICATION:
            return action.payload;
        default:
            return state;
    }
};

export default notifMessage;
