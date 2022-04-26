import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [showDetails, setShowDetails] = useState(false)

  const summary = () => (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setShowDetails(!showDetails)}>view</button>
      </div>
    </div>
  )

  const details = () => (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <br></br>
        {blog.url}
        <br></br>
        {blog.likes}
        <br></br>
        {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>hide</button>
      </div>
    </div>
  )

  return <div>{showDetails ? details() : summary()}</div>
}

export default Blog
