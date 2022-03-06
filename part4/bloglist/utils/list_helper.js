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
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
