import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import blogService from './services/blogs';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import handleInitalBlogs, { addBlog, deleteBlog } from './actions/blogs';
import { loginUser } from './actions/user';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  // redux store state.
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  const errorMessage = useSelector(state => state.errorMessage);
  const notification = useSelector(state => state.notification);

  // const [blogs, setBlogs] = useState([]);
  // const [user, setUser] = useState(null);
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [notifMessage, setNotifMessage] = useState(null);
  // const [addBlogVisible, setaddBlogVisible] = useState(false);

  useEffect(() => {
    // blogService.getAll().then(blogs =>
    //   setBlogs( blogs )
    // )
    // dispatch thunk action creator.
    dispatch(handleInitalBlogs())
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(loginUser(user));
      // setUser(user)
      blogService.setToken(user.token);
    }
  }, []);


    // try {
    //   const response = await blogService.create(obj)
    //   setBlogs(blogs.concat(response))
    //   setNotifMessage(`New blog: ${response.title} added by ${response.author}!`);
    //   setTimeout(() => {
    //     setNotifMessage(null)
    //   }, 5000)
    //   // hide add blog form
    //   setaddBlogVisible(false);
    // } catch(e) {
    //   console.log(e)
    //   setErrorMessage('Unable to add blog post please try again');
    //   setTimeout(() => {
    //     setErrorMessage(null)
    //   }, 5000)
    // }

  

  
  return (
    <div>
      {errorMessage !== null && <p className="error">{errorMessage}</p>}
      {notification !== null && <p className="notification">{notification}</p>}
      {user === null ? <LoginForm /> : <BlogList />}
    </div>
  )
}

export default App;