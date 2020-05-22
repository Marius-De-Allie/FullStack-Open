import React, { useState, useEffect } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs, error }) => {

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
    try {
      const response = await blogService.updateLikes(blog.id, updatedBlog);
      setBlogs(blogs.map(blog => {
        return blog.id === response.id ? response : blog
      }))

    } catch(e) {
      error('Sorry unable to update blog likes value');
      setTimeout(() => {
        error(null)
      }, 5000)
    }
  }

  return (
    <div style={styles.blogItem}>
      <div style={{padding: '5px'}}>
        {blog.title} {blog.author}
        {showDetails ? 
          <button 
            style={styles.btn}
            onClick={handleToggleDetails}
          >
          Hide</button> : 
          <button 
            style={styles.btn}
            onClick={handleToggleDetails}
          >
          View</button>
        }
        <div style={{display: showDetails ? '' : 'none'}}>
          <p>{blog.url}</p>
          <p>{`liks: ${blog.likes}`} <button onClick={handleLike}>like</button></p>
        </div>
      </div>
    </div>
  )
};


export default Blog
