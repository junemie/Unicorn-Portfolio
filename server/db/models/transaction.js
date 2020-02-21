const Sequelize = require('sequelize')
const db = require('../db')

const transaction = db.define('transaction', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ticker: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sharePrice: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = transaction
