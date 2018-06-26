const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const router = require('express').Router()

const UserModel = require('../models/users')
const checkNotLogin = require('../middlewares/check').checkNotLogin

router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signup')
})

router.post('/', checkNotLogin, function(req, res, next) {
  const name = req.fields.name // formidable模块已经把这些字段给解析好了
  const gender = req.fields.gender
  const bio = req.fields.bio
  const avatar = req.files.avatar.path.split(path.seq).pop()
  let password = req.fields.password
  const repassword = req.fields.repassword

  // 参数校验的过程 后面可以提取出来 变成一个中间过滤器方法函数 或者一个单独的中间件
  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      throw new Error('名字请限制在 1-10 个字符')
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('性别只能是 m、f 或 x')
    }
    if (!(bio.length >= 1 && bio.length <= 30)) {
      throw new Error('个人简介请限制在 1-30 个字符')
    }
    if (!req.files.avatar.name) {
      throw new Error('缺少头像')
    }
    if (password.length < 6) {
      throw new Error('密码至少 6 个字符')
    }
    if (password !== repassword) {
      throw new Error('两次输入密码不一致')
    }
  } catch (e) {
    fs.unlink(req.files.avatar.path)
    req.flash('error', e.message)
    return res.redirect('/signup')
  }

  password = sha1(password)
  // 把所有要存入数据库的信息准备好
  let user = {
    name: name,
    password: password,
    gender: gender,
    bio: bio,
    avatar: avatar
  }
  UserModel.create(user).then(function(result) {
    user = result.ops[0]
    delete user.password
    req.session.user = user
    req.flash('success', '注册成功')
    req.redirect('/posts')
  }).catch(function(e) {
    fs.unlink(req.files.avatar.path) // 用户名被占用则跳回注册页，而不是错误页
    if (e.message.match('duplicate key')) {
      req.flash('error', '用户名已被占用')
      return res.redirect('/signup')
    }
    next(e)
  })
})

module.exports = router
