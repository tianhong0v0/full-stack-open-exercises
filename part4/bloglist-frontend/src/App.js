import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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
    setNotification({
      content: content,
      type: type,
    })
  }

  const handleLogin = async (event, username, password) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      notify(`${user.username} logged in successfully`, 'info')
      setTimeout(() => {
        setNotification(null)
      }, 1000)
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
  }

  const addBlog = async (event, newBlog) => {
    event.preventDefault()
    try {
      const response = await blogService.create(newBlog)
      notify(`a new blog ${response.title} by ${user.username} added!`, 'info')
      setTimeout(() => {
        setNotification(null)
      }, 1000)
      setBlogs(blogs.concat(response))
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      notify(`${exception}`, 'alert')
      setTimeout(() => {
        setNotification(null)
      }, 1000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm login={handleLogin}></LoginForm>
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm addBlog={addBlog}></BlogForm>
    </Togglable>
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

  console.log(blogFormRef.current)
  return (
    <div>
      <Notification notification={notification} />
      {user === null ? loginForm() : blogslist()}
    </div>
  )
}

export default App
