import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import blogService from '../services/blogs';
import { setDetails, toggleDetails } from '../actions/showDetails';
import { addLike, deleteBlog } from '../actions/blogs';
import { setErrorMessage } from '../actions/errorMessage';
import { setNotificationMessage } from '../actions/notifMessage';
// Import PropTypes
import PropTypes from 'prop-types';

const Blog = ({ blog }) => {

  const dispatch = useDispatch();
  const showDetails = useSelector(state => state.showDetails);
  const user = useSelector(state => state.user);




  useEffect(() => {
    dispatch(setDetails(false));
    // setShowDetails(false)
  }, []);

  const styles = {
    btn: {
      display: 'inline',
      marginLeft: '2px'
    },
    blogItem: {
      border: '1px solid black',
      borderRadius: '5px',
      marginBottom: '10px'
    }
  };

  const handleToggleDetails = () => {
    dispatch(toggleDetails());
    // setShowDetails(!showDetails)
  };

  const handleDelete = async (id, blog) => {
    if(window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        const response = await blogService.deleteBlog(id);
        // console.log(response);
        dispatch(deleteBlog(id));
        // setBlogs(blogs.filter(blog => blog.id !== id))
        dispatch(setNotificationMessage(`${blog.title} blog by ${blog.author} has been deleted`));
        // setNotifMessage(`${blog.title} blog by ${blog.author} has been deleted`);
        setTimeout(() => {
          dispatch(setNotificationMessage(null));
          // setNotifMessage(null)
        }, 5000);

      } catch(e) {
        dispatch(setErrorMessage(`Sorry unable to delete ${blog.title} blog by ${blog.author}, try again`));
        // setErrorMessage(`Sorry unable to delete ${blog.title} blog by ${blog.author}, try again`);
        setTimeout(() => {
          dispatch(setErrorMessage(null));
        }, 5000);
      }
    } else {
      // Do nothing.
    }
  };

  // console.log('USER', user)
  // console.log('BLOGUSER', blog.user)
  return (
    <div style={styles.blogItem} className="blog">
      <div style={{padding: '5px'}}>
        <Link to={`/blogs/${blog.id}`}>
          <span className="title">{blog.title}</span><span className="author">{` ${blog.author}`}</span>
        </Link> 
      </div>
    </div>
  )
};

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   blogs: PropTypes.array.isRequired,
//   setBlogs: PropTypes.func.isRequired,
//   error: PropTypes.func.isRequired,
//   handleDelete: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired
// }


export default Blog
