import React from 'react';

const AddBlog = (props) => (
    <div>
      <div style={{display: props.addBlogVisible ? '' : 'none'}}>
        <h2>create new</h2>
        <form onSubmit={props.handleCreate}>
          <div>
            <label htmlFor="title">title</label>
            <input type="text" value={props.title} id="title" onChange={props.handleTitleChange} />
          </div>
          <div>
            <label htmlFor="author">author</label>
            <input type="text" value={props.author} id="author" onChange={props.handleAuthorChange}/>
          </div>
          <div>
            <label htmlFor="url">url</label>
            <input type="text" value={props.url} id="url" onChange={props.handleUrlChange}/>
          </div>
            <button type="submit" disabled={props.title === '' || props.author === '' || props.url === ''}>create</button>
          </form>
      </div>
      <div style={{display: props.addBlogVisible ? 'none' : ''}}>
        <button onClick={props.show}>new blog</button>
      </div>
      <div style={{display: props.addBlogVisible ? '' : 'none'}}>
        <button onClick={props.hide}>cancel</button>
      </div>
    </div>
);

export default AddBlog ;