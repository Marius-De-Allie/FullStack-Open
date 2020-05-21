import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [key, setKey] = useState(0)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [key]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user)
      blogService.setToken(user.token);
    }
  }, []);

  const handleNameChange = (evt) => {
    setUsername(evt.target.value)
  }

  const handlePassChange = (evt) => {
    setPassword(evt.target.value)
  }

  const handleLogin = async (evt) => {
    evt.preventDefault();
    try {
      const user = await loginService({username, password});

      // Add logged in user data to localStorage.
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      } , 5000)
    }
  };

  const LoginForm = () => (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            name="user" 
            id="username" 
            value={username}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="pass" 
            id="password" 
            value={password}
            onChange={handlePassChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const handleTitleChange = (evt) => {
    setTitle(evt.target.value)
  };
  const handleAuthorChange = (evt) => {
    setAuthor(evt.target.value)
  };
  const handleUrlChange = (evt) => {
    setUrl(evt.target.value)
  };


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  }

  const handleCreate = async evt => {
    evt.preventDefault();
    const blogObj = {
      title,
      author,
      url
    }

    console.log(blogObj)
    try {
      await blogService.create(blogObj)
      // Update key peice of component state to force app component to rerender when new blog is added.
      setKey(Math.random() * 10)
    } catch(e) {
      console.log(e)
    }
    setTitle('')
    setAuthor('')
    setUrl('')


  }

  const BlogList = () => (
    <div>
      {errorMessage === null && <p>{errorMessage}</p>}
      <h2>blogs</h2>
      {JSON.stringify(user.token)}
      <h3>{`${user.name} logged in`}</h3>
      <button onClick={handleLogout}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );

  return (
    <div>
      {user === null ? <LoginForm /> : <BlogList />}
      {user !== null &&<AddBlog
        title={title}
        author={author}
        url={url}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        handleCreate={handleCreate}
      />
    }
    </div>
  )
}

export default App