const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

jest.setTimeout(20000)

/*describe('test with token-based authentication', ()=>{
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'tmpForTest', passwordHash })
    await user.save()
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'the token based test',
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

}) */

describe('test without token-based authentication', () => {
  beforeEach(async () => {
    /*await Blog.deleteMany({})
    const blogModels = helper.initialBlogs.map((item) => new Blog(item))
    const promiseArray = blogModels.map((item) => item.save())
    await Promise.all(promiseArray) */

    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

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

  test('can not add a blog without token', async () => {
    const newBlog = {
      title: 'no token',
      author: 'Full Stack Open Course',
      url: 'www.fso.com',
      likes: 320,
    }

    await api.post('/api/blogs').send(newBlog).expect(401)
  })

  test('a valid blog can be added with token', async () => {
    const newBlog = {
      title: 'newBlog in test valid user add blog, wuhu',
      author: 'Full Stack Open Course',
      url: 'www.fso.com',
      likes: 320,
    }
    const login = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })

    const token = `bearer ${login.body.token.toString()}`
    await api
      .post('/api/blogs')
      .set('authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogAtEnd = await helper.blogsInDb()
    const titles = blogAtEnd.map((n) => n.title)
    expect(titles).toContain('newBlog in test valid user add blog, wuhu')
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
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
    console.log(response.body)
    expect(response.body.likes).toEqual(newLikes)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
