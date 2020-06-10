import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogs';
import { addLike } from '../actions/blogs';
import { setErrorMessage } from '../actions/errorMessage';
import { setNotificationMessage } from '../actions/notifMessage';



const BlogDetails = () => {
    const dispatch = useDispatch();

    const id = useParams().id;

    const blog = useSelector(state => state.blogs.find(blog => blog.id === id));


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
          dispatch(setNotificationMessage('Blog liked!'));
          setTimeout(() => {
              dispatch(setNotificationMessage(null))
          }, 5000);
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

    if(!blog) {
        return null;
    } else {
        return (
            <div>
                <h2>{blog.title}</h2>
                <a href="#">{blog.url}</a>
                <div>{`${blog.likes} likes`}<button onClick={handleLike}>like</button></div>
                <p>{`added by ${blog.user.name}`}</p>
            </div>
        );
    }
};

export default BlogDetails;