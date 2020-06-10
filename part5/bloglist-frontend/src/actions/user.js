const LOGIN_USER = 'LOGIN_USER';

const loginUser = user => ({
    type: LOGIN_USER,
    user
});

export { loginUser, LOGIN_USER };
