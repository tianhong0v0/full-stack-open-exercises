const blogsRouter = require('express').Router()
const { json } = require('express/lib/response')
const { response, request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const {
  requestLogger,
  tokenExtractor,
  userExtractor,
} = require('../utils/middleware')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogsRouter.get('/:id', (request, response) => {
  Blog.findById(request.params.id).then((item) => response.json(item))
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user
  const blog = new Blog({ ...request.body, user: user.id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(204).end()
  }
  if (blogToDelete.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({ error: 'only the creator can delete a blog' })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  })

  response.json(updatedBlog)
})

module.exports = blogsRouter
