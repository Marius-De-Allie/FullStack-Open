const SET_FILTER = 'SET_FILTER';

// action creators
const setFilter = (filterBy) => ({
    type: SET_FILTER,
    filterBy
});

// Reducer.
const filterReducer = (state = '', action) => {
    switch(action.type) {
        case SET_FILTER:
            // state = null;
            return state = action.filterBy;
        default:
            return state;
    }
};

export { filterReducer as default, setFilter };