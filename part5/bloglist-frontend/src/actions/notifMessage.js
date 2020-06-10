
const SET_NOTIFICATION = 'SET_NOTIFICATION';

const setNotificationMessage = payload => ({
    type: SET_NOTIFICATION,
    payload
});

export { setNotificationMessage, SET_NOTIFICATION };