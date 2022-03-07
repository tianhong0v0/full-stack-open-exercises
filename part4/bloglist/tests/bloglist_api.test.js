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
  console.log(`ret as json: ${response}`)
  console.log(`ret as json: ${response.body}`)

  //weird response.body works anyway
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

test('blog without title and url is not added', async () => {
  const newBlog = {
    author: 'just an author',
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('delete a blog with a valid id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map((r) => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('update a blog.likes with a valid id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newLikes = Math.floor(Math.random() * 1000000)
  const newBlog = { likes: newLikes }

  //if response = await api.put().send().expect(200)
  // response.body won't work
  const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog)
  console.log(response.body)
  expect(response.body.likes).toEqual(newLikes)
})

afterAll(() => {
  mongoose.connection.close()
})
