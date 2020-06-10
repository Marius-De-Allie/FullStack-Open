import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotificationMessage } from '../actions/notifMessage';
import { setErrorMessage } from '../actions/errorMessage';
import { setVisibility } from '../actions/addBlogVisible';
import { loginUser } from '../actions/user';

const LoginForm = () =>  {

  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (evt) => {
    setUsername(evt.target.value)
  };

  const handlePassChange = (evt) => {
    setPassword(evt.target.value)
  };

  const handleLogin = async (evt, username, password) => {
    evt.preventDefault();
    try {
      const user = await loginService({username, password});
      dispatch(setNotificationMessage(`${user.name} succesfully logged in!`));
      // setNotifMessage(`${user.name} succesfully logged in!`);
      setTimeout(() => {
        dispatch(setNotificationMessage(null));
        // setNotifMessage(null)
      }, 5000)
      dispatch(setVisibility(false));
      // setaddBlogVisible(false);
      // Add logged in user data to localStorage.
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(loginUser(user))
      // setUser(user);
    } catch(exception) {
      dispatch(setErrorMessage('Incorrect username or password'));
      // setErrorMessage('Incorrect username or password')
      setTimeout(() => {
        dispatch(setErrorMessage(null));
        // setErrorMessage(null)
      } , 5000)
    }
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={(evt) => handleLogin(evt, username, password)}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="user"
            id="username"
            value={username}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="pass"
            id="password"
            value={password}
            onChange={handlePassChange}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  );
};

export default LoginForm;