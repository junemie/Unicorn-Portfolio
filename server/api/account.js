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
