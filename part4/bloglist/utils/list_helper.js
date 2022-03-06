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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
