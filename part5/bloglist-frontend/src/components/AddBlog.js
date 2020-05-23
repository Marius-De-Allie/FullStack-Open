import React, { useState } from 'react';

const AddBlog = (props) => {

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

  const createBlog = (evt) => {
    props.handleCreate(evt, {
      title,
      author,
      url
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <div>
      <div style={{display: props.addBlogVisible ? '' : 'none'}}>
        <h2>create new</h2>
        <form onSubmit={createBlog}>
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
      <div style={{display: props.addBlogVisible ? 'none' : ''}}>
        <button onClick={props.show}>new blog</button>
      </div>
      <div style={{display: props.addBlogVisible ? '' : 'none'}}>
        <button onClick={props.hide}>cancel</button>
      </div>
    </div>
  )
};

export default AddBlog ;