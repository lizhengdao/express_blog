module.exports = {
  port: 3030,
  session: {
    secret: 'nBlog',
    key: 'nBlog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/nBlog'
}
