const User = require('./user')
const Stock = require('./stock')
const StockOrder = require('./stockOrder')

StockOrder.belongsTo(Stock)
Stock.hasMany(StockOrder)

User.belongsToMany(Stock, {through: 'Transaction'})
Stock.belongsToMany(User, {through: 'Transaction'})

module.exports = {
  User,
  Stock,
  StockOrder
}
