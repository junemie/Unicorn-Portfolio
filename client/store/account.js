import axios from 'axios'
const GET_PORTFOLIO = 'GET PORTFOLIO'
const CHECK_SYMBOL = 'CHECK_SYMBOL'
const BUY_STOCK = 'BUY_STOCK'

const defaultAccount = {
  portfolio: [],
  isSymbol: false,
  newBalance: 0
}

const getPortfolio = response => ({
  type: GET_PORTFOLIO,
  portfolio: response
})

const checkSymbol = symbol => ({type: CHECK_SYMBOL, symbol})
const buyStock = newBalance => ({type: BUY_STOCK, newBalance})

export const gotPortfolio = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/account/${userId}`)

    if (data[0]) {
      const symbolStr = data.map(stock => stock.ticker).toString()
      const variable = await axios.get('/api/iex')
      let access = variable.data.variable

      const stockPrices = await axios.get(
        `https://cloud.iexapis.com/v1/stock/market/batch?symbols=${symbolStr}&types=price,ohlc&token=${access}`
      )

      let stockPriceObj = Object.entries(stockPrices.data)
      let formattedObj = {}

      for (const [stockName, value] of stockPriceObj) {
        formattedObj[stockName] = {
          // price: formatPrice(value.price),
          price: Math.round((value.price + Number.EPSILON) * 100) / 100,
          open: value.ohlc.open ? value.ohlc.open.price : value.price
        }
      }

      data.forEach(stock => {
        if (formattedObj[stock.ticker]) {
          let num = formattedObj[stock.ticker].price * stock.quantity
          stock.shareCost = num.toFixed(2)
          stock.sharePrice = formattedObj[stock.ticker].price.toFixed(2)
          stock.openPrice = formattedObj[stock.ticker].open.toFixed(2)
        }
      })
    }
    dispatch(getPortfolio(data))
  } catch (err) {
    console.log(err)
  }
}

export const checkedSymbols = searchSymbol => async dispatch => {
  try {
    const variable = await axios.get('/api/iex')
    let access = variable.data.variable

    const {data} = await axios.get(
      `https://cloud.iexapis.com/stable/search/${searchSymbol}?filter=symbol&token=${access}`
    )

    let response = !!data.length
    dispatch(checkSymbol(response))
  } catch (err) {
    console.log(err)
  }
}

export const boughtStock = (symbol, qty, userId, balance) => async dispatch => {
  try {
    const variable = await axios.get('/api/iex')
    let access = variable.data.variable
    const {data} = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/price?token=${access}`
    )

    if (data) {
      let price = data.toFixed(2)
      let shareCost = price * qty
      //Check is the share cost (share * qty) is greater than current balance
      if (shareCost > balance) {
        return dispatch(buyStock(balance))
      } else {
        let updatedBalance = (balance - shareCost).toFixed(2)
        const response = await axios.post(`/api/account/${userId}`, {
          symbol,
          qty,
          updatedBalance,
          price
        })
        return dispatch(buyStock(response.data))
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export default function(state = defaultAccount, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return {...state, portfolio: [...action.portfolio]}
    case CHECK_SYMBOL:
      return {...state, isSymbol: action.symbol}
    case BUY_STOCK:
      return {...state, newBalance: action.newBalance}
    default:
      return state
  }
}
