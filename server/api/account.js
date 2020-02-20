const router = require('express').Router()
const {User, Stock, Transaction} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const portfolio = await Stock.findAll({
      where: {
        userId: req.params.userId
      }
    })

    res.json(portfolio)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    let userId = req.params.userId
    let ticker = req.body.symbol
    let quantity = req.body.qty
    let updatedBalance = req.body.updatedBalance
    console.log(typeof updatedBalance)

    //Update User account balance
    await User.update(
      {balance: updatedBalance},
      {
        where: {
          id: userId
        }
      }
    )

    //Create a new row in the Transaction table to keep track of history
    await Transaction.create({
      quantity,
      ticker,
      userId
    })

    //Find the stock that user owns
    const stock = await Stock.findAll({
      where: {
        ticker,
        userId
      }
    })

    //If the user already own the symbol then update the quantity
    if (stock[0]) {
      let updatedQty = stock[0].quantity + quantity
      await Stock.update(
        {quantity: updatedQty},
        {
          where: {
            ticker: ticker,
            userId: userId
          }
        }
      )
      res.json(updatedBalance)
    } else {
      //otherwise create a new row in the Stock table with symbol and userId
      await Stock.create({
        ticker: ticker,
        quantity: quantity,
        userId: userId
      })

      res.json(updatedBalance)
    }
  } catch (error) {
    next(error)
  }
})
