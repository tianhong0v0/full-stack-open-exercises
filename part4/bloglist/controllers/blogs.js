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
  const body = request.body
  const user = request.user
  const blog = new Blog({
    likes: body.likes,
    title: body.title,
    author: body.author,
    url: body.url,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'unauthorized to delete ' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    likes: request.body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })

  response.json(updatedBlog)
})

module.exports = blogsRouter
