// const initialValue = 'Test notification.';
const SET_NOTIFICATION = 'SET_NOTIFICATION';
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

// Action creeators.

const setNotification = (message) => ({
    type: SET_NOTIFICATION,
    message
    
});

const removeNotification = () => ({
    type: REMOVE_NOTIFICATION
});

// let nextNotificatinId = 0;
const handleNotification = (message, time) => {
    return (dispatch , getState) => {
        
        console.log('NOTIF', getState())
        let timerId;
        if(getState().notification.length === 0) {
            dispatch(setNotification(message));
            timerId = setTimeout(() => {
                dispatch(removeNotification())
            }, time)
            clearTimeout(timerId)
        } else if(getState().notification.length > 0) {
            window.clearTimeout(timerId)
            dispatch(setNotification(message));
            setTimeout(() => {
                dispatch(removeNotification())
            }, time)
        }
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