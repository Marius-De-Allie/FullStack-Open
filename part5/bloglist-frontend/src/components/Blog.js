import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

  const handleLike = async () => {

    const blogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes
    };

    const updatedBlog = {
      ...blogObj,
      likes: blogObj.likes + 1
    };
    // console.log(updatedBlog)
    try {
      const response = await blogService.updateLikes(blog.id, updatedBlog);
      console.log(response)
      dispatch(addLike(response.id));
      // setBlogs(blogs.map(blog => {
      //   return blog.id === response.id ? response : blog
      // }))

    } catch(e) {
      dispatch(setErrorMessage('Sorry unable to update blog likes value'));
      // error('Sorry unable to update blog likes value');
      setTimeout(() => {
        dispatch(setErrorMessage(null));
        // error(null)
      }, 5000)
    }
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
        <span className="title">{blog.title}</span><span className="author">{` ${blog.author}`}</span> 
        {showDetails ?
          <button
            style={styles.btn}
            onClick={handleToggleDetails}
            className="hide-btn"
          >
            Hide
          </button> :
          <button
            style={styles.btn}
            onClick={handleToggleDetails}
            className="view-btn"
          >
            View
          </button>
        }
        <div style={{display: showDetails ? '' : 'none'}} className="details">
          <p>{blog.url}</p>
          <p className="likes">{`likes: ${blog.likes}`} <button onClick={handleLike} className="like-btn">like</button></p>
          {blog.user.username === user.username && <button className="remove-btn" onClick={() => handleDelete(blog.id, blog)}>remove</button>}
        </div>
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
