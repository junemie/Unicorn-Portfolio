const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    let transactions = await Transaction.findAll({
      where: {
        userId: req.params.userId
      },
      order: [['createdAt', 'ASC']]
    })
    res.json(transactions)
  } catch (error) {
    next(error)
  }
})
