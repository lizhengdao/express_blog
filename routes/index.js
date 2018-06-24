/**
 * 1. 注册： 注册页面 GET /signup  提交注册信息：POST /signup
 * 2. 登录： 登录页面 GET /signin  提交登录请求：POST /signin
 * 3. 登出(注销)：GET /signout
 * 4. 看文章：
 *  - 主页：GET /posts
 *  - 个人主页：GET /posts?author=XXX
 *  - 查看文章：GET /posts/:postId
 * 5. 发表文章：发表文章页面 GET /posts/create  发表文章 POST /posts/create
 * 6. 修改文章：修改文章页面 GET /posts/edit/:postId  修改文章 POST /posts/edit/:postId
 * 7. 删除文章：GET /posts/remove/:postId
 * 8. 留言：创建留言 POST /comments  删除留言 GET /comments/remove/:commentId
 */

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.redirect('/posts')
  })
  app.use('/signup', require('./signup'))
  app.use('/signin', require('./signin'))
  app.use('/signout', require('./signout'))
  app.use('/posts', require('./posts'))
  app.use('/comments', require('./comments'))
}
