const SET_ERROR = 'SET_ERROR';

const setErrorMessage = payload => ({
    type: SET_ERROR,
    payload
});

export { setErrorMessage, SET_ERROR };