/**
 * post的文章相关路由操作都是要登录后才行
 */

 const router = require('express').Router()

 const checkLogin = require('../middlewares/check').checkLogin

 router.get('/', function(req, res, next) {
   res.send('主页')
   // 处理某一个特定用户的参数@todo
 })

 router.get('/create', checkLogin, function(req, res, next) {
   res.send('文章发表页')
 })

 router.post('/create', checkLogin, function(req, res, next) {
   res.send('发表文章')
   // 处理发表文章的逻辑
 })

 router.get('/:postId')

 module.exports = router
