const router = require('express').Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin

router.get('/', checkNotLogin, function(req, res, next) {
  res.send('登录界面')
})

router.post('/', checkNotLogin, function(req, res, next) {
  res.send('登录成功')
})

module.exports = router
