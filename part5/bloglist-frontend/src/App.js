import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
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


  const handleLogin = async (evt, username, password) => {
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
    } catch(exception) {
      setErrorMessage('Incorrect username or password')
      setTimeout(() => {
        setErrorMessage(null)
      } , 5000)
    }
  };

  

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

  const handleDelete = async (id, blog) => {
    if(window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        const response = await blogService.deleteBlog(id);
        console.log(response);
        setBlogs(blogs.filter(blog => blog.id !== id))
        setNotifMessage(`${blog.title} blog by ${blog.author} has been deleted`);
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000);
  
      } catch(e) {
        setErrorMessage(`Sorry unable to delete ${blog.title} blog by ${blog.author}, try again`);
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000);
      }
    } else {
      // Do nothing.
    }
  };

  const handleAddBlogVisible = (value) => {
    setaddBlogVisible(value)
  };
  console.log(user)
  return (
    <div>
      {errorMessage !== null && <p className="error">{errorMessage}</p>}
      {notifMessage !== null && <p className="notification">{notifMessage}</p>}
      {user === null ? <LoginForm handleLogin={handleLogin} /> : 
        <BlogList 
          user={user}
          handleLogout={handleLogout}
          blogs={blogs.sort((a, b) => b.likes - a.likes)}
          handleCreate={handleCreate}
          addBlogVisible={addBlogVisible}
          show={() => handleAddBlogVisible(true)}
          hide={() => handleAddBlogVisible(false)}
          setBlogs={setBlogs}
          error={setErrorMessage}
          handleDelete={handleDelete}
        />}
    </div>
  )
}

export default App;