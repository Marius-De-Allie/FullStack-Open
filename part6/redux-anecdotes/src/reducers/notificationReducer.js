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

export { notificationReducer as default, setNotification, removeNotification };