import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import blogService from './services/blogs';
import handleInitalBlogs, { addBlog, deleteBlog } from './actions/blogs';
import { loginUser } from './actions/user';
import Home from './components/Home';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import BlogDetails from './components/BlogDetails';
import Nav from './components/Nav';
import NotfoundPage from './components/NotfoundPage';
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

  return (
    <div>
      <Nav />
      {errorMessage !== null && <p className="error">{errorMessage}</p>}
      {notification !== null && <p className="notification">{notification}</p>}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/users" exact component={Users} />
        <Route path="/users/:id" component={UserDetails} />
        <Route path="/blogs/:id" component={BlogDetails} />
        <Route component={NotfoundPage} />
      </Switch>
    </div>
  )
}

export default App;