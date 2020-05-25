const initialValue = 'Test notification.'


const notificationReducer = (state = initialValue, action) => {
    switch(action.type) {

        default:
            return state;
    }
};

export default notificationReducer;