import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddBlog from './AddBlog';
import Blog from './Blog';
import { loginUser } from '../actions/user';
import { setNotificationMessage } from '../actions/notifMessage';
import { setVisibility } from '../actions/addBlogVisible';

const BlogList = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => {
    return state.blogs.sort((a, b) => b.likes - a.likes);
  });

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(loginUser(null));
    // setUser(null);
    dispatch(setNotificationMessage('Successfully logged out'));
    // setNotifMessage('Successfully logged out');
    setTimeout(() => {
      dispatch(setNotificationMessage(null))
      // setNotifMessage(null)
    }, 5000)
    dispatch(setVisibility(false));
    // setaddBlogVisible(false);
  };

  return (
    <div className="blog-list">
      <h2>blogs</h2>
      {/* {JSON.stringify(user.token)} */}
      <h3>{`${user.name} logged in`}</h3>
      <button onClick={handleLogout}>logout</button>
      <AddBlog />
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
};

export default BlogList ;