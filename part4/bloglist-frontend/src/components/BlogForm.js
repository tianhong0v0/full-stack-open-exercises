import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState('')

  const handleAddBlog = (event) => {
    addBlog(event, newBlog)
    setNewBlog('')
  }

  return (
    <div>
      <h2>create blog</h2>
      <form onSubmit={handleAddBlog}>
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
}

export default BlogForm
