// const initialValue = 'Test notification.';
const SET_NOTIFICATION = 'SET_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

// Action creeators.

const setNotification = message => ({
    type: SET_NOTIFICATION,
    message
});

const removeNotification = () => ({
    type: REMOVE_NOTIFICATION
});

const handleNotification = (message, time) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time)
    }
};


const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case SET_NOTIFICATION:
            return state = action.message;
        case REMOVE_NOTIFICATION:
            return state = ''
        default:
            return state;
    }
};

export { notificationReducer as default, handleNotification };