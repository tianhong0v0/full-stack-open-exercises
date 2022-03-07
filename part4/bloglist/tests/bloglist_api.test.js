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

jest.setTimeout(20000)

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

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Full Stack Open Course',
    url: 'www.fso.com',
    likes: 320,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogAtEnd.map((n) => n.title)
  expect(titles).toContain('async/await simplifies making async calls')
})

test('a blog without likes can be added, and has default likes 0', async () => {
  const newBlogWithoutLikes = {
    title: 'nobody likes',
    author: 'how to be poor',
    url: 'www.random.com',
  }
  const response = await api.post('/api/blogs').send(newBlogWithoutLikes)
  expect(response.body.likes).toEqual(0)
})

afterAll(() => {
  mongoose.connection.close()
})
