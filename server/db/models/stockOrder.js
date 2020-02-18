const Sequelize = require('sequelize')
const db = require('../db')

const stockOrder = db.define('stockOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = stockOrder
