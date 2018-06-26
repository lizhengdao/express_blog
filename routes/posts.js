/**
 * post的文章相关路由操作都是要登录后才行
 */

 const router = require('express').Router()

 const checkLogin = require('../middlewares/check').checkLogin

 router.get('/', function(req, res, next) {
   res.render('posts')
   // 处理某一个特定用户的参数@todo
 })

 router.get('/create', checkLogin, function(req, res, next) {
   res.send('文章发表页')
 })

 router.post('/create', checkLogin, function(req, res, next) {
   res.send('发表文章')
   // 处理发表文章的逻辑
 })

 router.get('/edit/:postId', checkLogin, function(req, res, next) {
   res.send('返回更新文章页面')
 })

 router.post('/edit/:postId', checkLogin, function(req, res, next) {
   res.send('更新文章内容逻辑')
 })

 router.get('/remove/:postId', checkLogin, function(req, res, next) {
   res.send('删除文章')
 })

 module.exports = router
