import React, { useState, useEffect } from 'react';
import blogService from '../services/blogs';
// Import PropTypes
import PropTypes from 'prop-types';

const Blog = ({ blog, blogs, setBlogs, error, handleDelete, user }) => {

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setShowDetails(false)
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
    setShowDetails(!showDetails)
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
    console.log(updatedBlog)
    try {
      const response = await blogService.updateLikes(blog.id, updatedBlog);
      console.log(response)
      setBlogs(blogs.map(blog => {
        return blog.id === response.id ? response : blog
      }))

    } catch(e) {
      error('Sorry unable to update blog likes value');
      setTimeout(() => {
        error(null)
      }, 5000)
    }
  };

  const onClickDelete = async () => {
    await handleDelete(blog.id, blog);

  }
  console.log('USER', user)
  console.log('BLOGUSER', blog.user)
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
          {blog.user.username === user.username && <button className="remove-btn" onClick={onClickDelete}>remove</button>}
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
