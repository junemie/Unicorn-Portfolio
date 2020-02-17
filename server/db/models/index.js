const User = require('./user')
const Stock = require('./stock')
const StockOrder = require('./stockOrder')

StockOrder.belongsTo(Stock)
Stock.hasMany(StockOrder)

Stock.belongsTo(User)
User.hasMany(Stock)

User.hasMany(Stock)
Stock.belongsTo(User)

User.belongsToMany(Stock, {through: 'Transaction'})
Stock.belongsToMany(User, {through: 'Transaction'})

module.exports = {
  User,
  Stock,
  StockOrder
}
