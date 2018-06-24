const router = require('express').Router()

const checkLogin = require('../middlewares/check').checkLogin

router.get('/', checkLogin, function(req, res, next) {
  res.send('已注销')
})
module.exports = router
