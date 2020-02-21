const router = require('express').Router()
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.json({variable: process.env.KEY})
  } catch (error) {
    console.log(error)
  }
})
