import React, { useState } from 'react';

const LoginForm = (props) =>  {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (evt) => {
    setUsername(evt.target.value)
  };

  const handlePassChange = (evt) => {
    setPassword(evt.target.value)
  };

  const login = (evt) => {
    props.handleLogin(evt, username, password);
    setUsername('');
    setPassword('');
  }
  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={login}>
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
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;