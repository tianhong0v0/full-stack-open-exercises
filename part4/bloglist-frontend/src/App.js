import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [notification, setNotification] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (content, type) => {
    console.log(`inside notify ${type}`)
    setNotification({
      content: content,
      type: type,
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      notify(`${user.username} logged in successfully`, 'info')
      setTimeout(() => {
        setNotification(null)
      }, 1000)
      console.log('logged in successfully')
    } catch (exception) {
      notify('wrong username or password', 'alert')
      setTimeout(() => {
        setNotification(null)
      }, 1000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.create(newBlog)
      notify(`a new blog ${response.title} by ${user.username} added!`, 'info')
      setTimeout(() => {
        setNotification(null)
      }, 1000)
      setBlogs(blogs.concat(response))
      setNewBlog('')
    } catch (exception) {
      notify(`${exception}`, 'alert')
      setTimeout(() => {
        setNotification(null)
      }, 1000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogslist = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button type='submit' onClick={handleLogout}>
        logout
      </button>
      {blogForm()}
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>create blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={newBlog.title}
            name=''
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={newBlog.author}
            name=''
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={newBlog.url}
            name=''
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? loginForm() : blogslist()}
    </div>
  )
}

export default App
