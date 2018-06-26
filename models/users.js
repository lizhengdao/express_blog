const User = require('../lib/mongo').User

module.exports = {
  create: function create (user) {
    return User.create(user).exec()
  },

  getUserByName: function getUserByName (name) {
    return User.findOne({ name: name })
    .addCreatedAt() // 功能是通过_id生成时间戳
    .exec()
  }
}
