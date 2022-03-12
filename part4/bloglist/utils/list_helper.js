const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return array.length === 0 ? 0 : array.reduce(reducer, 0)
}

const favoriteBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  return blogs.sort((a, b) => b.likes - a.likes)[0]
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
  //groupBy returns an object instead of an array
  const fav = _.last(_.sortBy(authors, (value) => totalLikes(value)))

  return {
    author: fav[0].author, //all items in the array fav has one same author
    //there shall be better way to access author name
    likes: totalLikes(fav),
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog: favoriteBlogs,
  mostBlogs,
  mostLikes,
}
