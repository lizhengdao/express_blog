const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connent-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const routes = require('./routes')
const pkg = require('./package')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true,
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({ // 这里是指把 session 储存到 mongodb 中
    url: config.mongodb
  })
}))

app.use(flash())
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'),
  keepExtensions: true
}))

app.locals.blog = { // 模板全局常量
  title: pkg.name,
  description: pkg.description
}

app.use(function(req, res, next) { // 模板全局变量
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString() // 每次请求的错误信息可能都不同
  next()
})

routes(app)

app.listen(config.port, function() {
  console.log(`${pkg.name} listening on port ${config.port}`)
})
