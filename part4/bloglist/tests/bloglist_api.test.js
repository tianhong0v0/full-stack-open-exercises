const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogModels = helper.initialBlogs.map((item) => new Blog(item))
  const promiseArray = blogModels.map((item) => item.save())
  await Promise.all(promiseArray)
})

jest.setTimeout(10000)

test('all blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property of the blog is named id', async () => {
  const idToGet = helper.initialBlogs[0]._id
  const response = await api.get(`/api/blogs/${idToGet}`)
  expect(response.body.id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
