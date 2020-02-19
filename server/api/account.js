const router = require('express').Router()
const {User, Stock} = require('../db/models')
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

    console.log('FORNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN', updatedBalance)
    //Update Uesr account balance
    await User.update(
      {balance: updatedBalance},
      {
        where: {
          userId: userId
        }
      }
    )

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
      res.json(stock)
    } else {
      //otherwise create a new row in the table with symbol and userId
      let newStock = await Stock.create({
        ticker: ticker,
        quantity: quantity,
        userId: userId
      })
      res.json(newStock)
    }
  } catch (error) {
    console.log(error)
  }
})
