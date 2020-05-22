import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notifMessage, setNotifMessage] = useState(null);
  const [addBlogVisible, setaddBlogVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user)
      blogService.setToken(user.token);
    }
  }, []);

  const handleNameChange = (evt) => {
    setUsername(evt.target.value)
  }

  const handlePassChange = (evt) => {
    setPassword(evt.target.value)
  }

  const handleLogin = async (evt) => {
    evt.preventDefault();
    try {
      const user = await loginService({username, password});
      setNotifMessage(`${user.name} succesfully logged in!`);
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
      setaddBlogVisible(false);
      // Add logged in user data to localStorage.
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch(exception) {
      setErrorMessage('Incorrect username or password')
      setTimeout(() => {
        setErrorMessage(null)
      } , 5000)
    }
  };

  const LoginForm = () => (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    setNotifMessage(`Successfully logged out`);
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
      setaddBlogVisible(false);
  }

  const handleCreate = async (evt, obj) => {
    evt.preventDefault();
   

    try {
      const response = await blogService.create(obj)
      setBlogs(blogs.concat(response))
      setNotifMessage(`New blog: ${response.title} added by ${response.author}!`);
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
      // hide add blog form
      setaddBlogVisible(false);
    } catch(e) {
      console.log(e)
      setErrorMessage(`Unable to add blog post please try again`);
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  };

  const handleAddBlogVisible = (value) => {
    setaddBlogVisible(value)
  };

  return (
    <div>
      {errorMessage !== null && <p className="error">{errorMessage}</p>}
      {notifMessage !== null && <p className="notification">{notifMessage}</p>}
      {user === null ? <LoginForm /> : 
        <BlogList 
          user={user}
          handleLogout={handleLogout}
          blogs={blogs}
          handleCreate={handleCreate}
          addBlogVisible={addBlogVisible}
          show={() => handleAddBlogVisible(true)}
          hide={() => handleAddBlogVisible(false)}
          setBlogs={setBlogs}
          error={setErrorMessage}
        />}
    </div>
  )
}

export default App;

// {user !== null && 
  // <AddBlog
  //   title={title}
  //   author={author}
  //   url={url}
  //   handleTitleChange={handleTitleChange}
  //   handleAuthorChange={handleAuthorChange}
  //   handleUrlChange={handleUrlChange}
  //   handleCreate={handleCreate}
  //   visibility={addBlogVisible}
  // />
// }