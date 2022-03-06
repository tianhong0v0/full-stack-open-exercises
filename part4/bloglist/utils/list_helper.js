const _ = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return array.length === 0 ? 0 : array.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const fav = blogs.reduce(
    (tempFav, item) => (tempFav.likes > item.likes ? tempFav : item),
    blogs[0]
  )
  const result = { title: fav.title, author: fav.author, likes: fav.likes }
  console.log(JSON.stringify(result))
  return result
}

const mostBlogs = (blogs) => {
  const authorsList = _.countBy(blogs, (item) => item.author)

  const authorWithMostBlogs = _.max(
    Object.keys(authorsList),
    (key) => authorsList[key]
  )

  return {
    author: authorWithMostBlogs,
    blogs: authorsList[authorWithMostBlogs],
  }
}

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, (item) => item.author)

  const fav = _.last(_.sortBy(authors, (item) => totalLikes(item)))

  return {
    author: fav[0].author,
    likes: totalLikes(fav),
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
