const router = require('express').Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin

router.get('/', checkNotLogin, function(req, res, next) {
  res.send('注册页面')
})

router.post('/', checkNotLogin, function(req, res, next) {
  res.send('注册成功')
})

module.exports = router
