import { bindActionCreators } from "redux";
import { INIT_USERS } from '../actions/users';

const users = (state = [], action) => {
    switch(action.type) {
        case INIT_USERS:
            return [...action.users]
        default:
            return state;
    }
};

export default users;