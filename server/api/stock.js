const router = require('express').Router()
const Sequelize = require('sequelize')
const {Stock, transaction, User} = require('../db/models')

module.exports = router

//route to get users all stock

router.get('/:userId', async (req, res, next) => {
  try {
    const stocks = await User.find({
      where: {
        userId: req.params.userId
      },
      include: [{model: Stock}]
    })

    console.log(stocks, 'HEREEEEEE IS STOCKSSSSSSS')

    // const stocks = transaction.getStock();
  } catch (error) {
    console.log(error)
    next(err)
  }
})
