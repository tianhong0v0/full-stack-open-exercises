const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.get('/:id', (request, response) => {
  Blog.findById(request.params.id).then((item) => response.json(item))
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()

  response.status(201).json(result)
})

module.exports = blogsRouter
