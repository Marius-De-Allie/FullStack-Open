import React from 'react';
import AddBlog from './AddBlog';
import Blog from './Blog';

const BlogList = (props) => (
  <div>
    <h2>blogs</h2>
    {/* {JSON.stringify(user.token)} */}
    <h3>{`${props.user.name} logged in`}</h3>
    <button onClick={props.handleLogout}>logout</button>
    <AddBlog
      title={props.title}
      author={props.author}
      url={props.url}
      handleTitleChange={props.handleTitleChange}
      handleAuthorChange={props.handleAuthorChange}
      handleUrlChange={props.handleUrlChange}
      handleCreate={props.handleCreate}
      addBlogVisible={props.addBlogVisible}
      show={props.show}
      hide={props.hide}
    />
    {props.blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        blogs={props.blogs}
        setBlogs={props.setBlogs}
        error={props.error}
        handleDelete={props.handleDelete}
        user={props.user}
      />
    )}
  </div>
);

export default BlogList ;