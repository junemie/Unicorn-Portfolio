const User = require('./user')
const Stock = require('./stock')
const Transaction = require('./transaction')

Transaction.belongsTo(User)
User.hasMany(Transaction)

User.hasMany(Stock)
Stock.belongsTo(User)

module.exports = {
  User,
  Stock,
  Transaction
}
