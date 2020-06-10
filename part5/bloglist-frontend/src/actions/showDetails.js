const SET_DETAILS = 'SET_DETAILS';
const TOGGLE_DETAILS = 'TOGGLE_DETAILS';

const setDetails = (payload) => ({
    type: SET_DETAILS,
    payload
});

const toggleDetails = () => ({
    type: TOGGLE_DETAILS
})

export { setDetails, SET_DETAILS, toggleDetails, TOGGLE_DETAILS };