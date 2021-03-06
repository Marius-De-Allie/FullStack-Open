import { combineReducers } from 'redux';
import blogs from './blogs';
import user from './user';
import errorMessage from './errorMessage';
import notifMessage from './notifMessage';
import addBlogVisible from './addBlogVisible';
import showDetails from './showDetails';
import users from './users';

export default combineReducers({
    blogs,
    user,
    errorMessage,
    notification: notifMessage,
    addBlogVisible,
    showDetails,
    users
});

