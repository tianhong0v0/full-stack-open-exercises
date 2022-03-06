const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

console.log('connecting to', config.MONGODB_URI)
mongoose
  .connect(config.MONGODB_URI)
  .then((result) => logger.info('Successfully connected to database'))
  .catch((error) => logger.error(error))

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
