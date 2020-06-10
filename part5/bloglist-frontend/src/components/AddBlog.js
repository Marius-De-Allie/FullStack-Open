import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import blogService from '../services/blogs';
import { addBlog } from '../actions/blogs';
import { setNotificationMessage } from '../actions/notifMessage';
import { setVisibility } from '../actions/addBlogVisible'
import { setErrorMessage } from '../actions/errorMessage';

const AddBlog = (props) => {

  const dispatch = useDispatch();

  const addBlogVisible = useSelector(state => state.addBlogVisible)

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = (evt) => {
    setTitle(evt.target.value)
  };
  const handleAuthorChange = (evt) => {
    setAuthor(evt.target.value)
  };
  const handleUrlChange = (evt) => {
    setUrl(evt.target.value)
  };

  const handleCreate = async (evt, obj) => {
    evt.preventDefault();


    try {
      const response = await blogService.create(obj)
      dispatch(addBlog(response))
      // setBlogs(blogs.concat(response))
      dispatch(setNotificationMessage(`New blog: ${response.title} added by ${response.author}!`));
      // setNotifMessage(`New blog: ${response.title} added by ${response.author}!`);
      setTimeout(() => {
        dispatch(setNotificationMessage(null))
      }, 5000);
      // setTimeout(() => {
      //   setNotifMessage(null)
      // }, 5000)
      // hide add blog form
      dispatch(setVisibility(false));
      // setaddBlogVisible(false);
    } catch(e) {
      console.log(e)
      dispatch(setErrorMessage('Unable to add blog post please try again'))
      // setErrorMessage('Unable to add blog post please try again');
      setTimeout(() => {
        dispatch(setErrorMessage(null));
      }, 5000)
    }
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  const toggleAddBlogVis = (value) => {
    dispatch(setVisibility(value));
  }

  // const createBlog = (evt) => {
  //   props.handleCreate(evt, {
  //     title,
  //     author,
  //     url
  //   });
  //   setTitle('');
  //   setAuthor('');
  //   setUrl('');
  // }

  return (
    <div>
      <div style={{display: addBlogVisible ? '' : 'none'}}>
        <h2>create new</h2>
        <form onSubmit={(evt) => handleCreate(evt, {title, author, url})}>
          <div>
            <label htmlFor="title">title</label>
            <input type="text" value={title} id="title" onChange={handleTitleChange} />
          </div>
          <div>
            <label htmlFor="author">author</label>
            <input type="text" value={author} id="author" onChange={handleAuthorChange}/>
          </div>
          <div>
            <label htmlFor="url">url</label>
            <input type="text" value={url} id="url" onChange={handleUrlChange}/>
          </div>
          <button id="create" type="submit" disabled={title === '' || author === '' || url === ''}>create</button>
        </form>
      </div>
      <div style={{display: addBlogVisible ? 'none' : ''}}>
        <button onClick={() => toggleAddBlogVis(true)}>new blog</button>
      </div>
      <div style={{display: addBlogVisible ? '' : 'none'}}>
        <button onClick={() => toggleAddBlogVis(false)}>cancel</button>
      </div>
    </div>
  )
};

export default AddBlog ;