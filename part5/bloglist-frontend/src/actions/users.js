import usersService from '../services/users';

const INIT_USERS = 'INIT_USERS';

const intializeUsers = users => ({
    type: INIT_USERS,
    users
});


const handleInitUsers = () => {

    return async(dispatch) => {
        try {
            const users = await usersService.getAll();
            dispatch(intializeUsers(users));

        } catch(e) {
            console.log('Unable to retreive users', e)
        }
    }
};

export { handleInitUsers, INIT_USERS };