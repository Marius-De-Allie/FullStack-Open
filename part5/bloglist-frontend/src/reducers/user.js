import { LOGIN_USER } from '../actions/user';

const initialState = null;
// User reducer.
const user = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER:
            return action.user;
        default:
            return state;
    }
};

export default user;