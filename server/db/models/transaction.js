const Sequelize = require('sequelize')
const db = require('../db')

//TODO: Add price of the ticker share at the time of transaction
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
