const router = require('express').Router()
module.exports = router
const KEY = process.env.KEY
const axios = require('axios')

router.get('/symbol/:symbol', async (req, res, next) => {
  try {
    let symbol = req.params.symbol
    const {data} = await axios.get(
      `https://cloud.iexapis.com/stable/search/${symbol}?filter=symbol&token=${KEY}`
    )
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.get('/portfolio/:symbolStr', async (req, res, next) => {
  try {
    let symbolStr = req.params.symbolStr
    const {data} = await axios.get(
      `https://cloud.iexapis.com/v1/stock/market/batch?symbols=${symbolStr}&types=price,ohlc&token=${KEY}`
    )
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.get('/stocks/:symbol', async (req, res, next) => {
  try {
    let symbol = req.params.symbol
    const {data} = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/price?token=${KEY}`
    )
    res.json(data)
  } catch (error) {
    next(error)
  }
})
