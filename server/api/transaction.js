const router = require('express').Router()
const {Stock} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    let transactions = await Stock.findAll({
      where: {
        userId: req.params.userId
      },
      order: [['createdAt', 'ASC']]
    })
    console.log('TRANSACTIONS', transactions)
    res.json(transactions)
  } catch (error) {
    next(error)
  }
})
