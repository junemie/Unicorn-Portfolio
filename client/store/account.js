import axios from 'axios'

import {key} from '../../secrets'

const GET_PORTFOLIO = 'GET PORTFOLIO'
const CHECK_SYMBOL = 'CHECK_SYMBOL'
const BUY_STOCK = 'BUY_STOCK'

const defaultAccount = {
  portfolio: [],
  isSymbol: false,
  newBalance: 0
}

const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})
const checkSymbol = symbol => ({type: CHECK_SYMBOL, symbol})
const buyStock = newBalance => ({type: BUY_STOCK, newBalance})

export const gotPortfolio = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/account/${userId}`)
    // const {data} = await axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${key}`)
    dispatch(getPortfolio(data))
  } catch (err) {
    console.log(err)
  }
}

export const checkedSymbols = searchSymbol => async dispatch => {
  try {
    //TODO: CHANGE THE SANDBOX TO CLOUD API -> https://cloud.iexapis.com/
    const {data} = await axios.get(
      `https://sandbox.iexapis.com/stable/search/${searchSymbol}?filter=symbol&token=${key}`
    )
    let response = !!data.length
    console.log(response)
    dispatch(checkSymbol(response))
  } catch (err) {
    console.log(err)
  }
}

export const boughtStock = (symbol, qty, userId, balance) => async dispatch => {
  try {
    //TODO
    //CHANGE THE SANDBOX TO CLOUD API -> https://cloud.iexapis.com/
    const {data} = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/${symbol}/price?token=${key}`
    )

    if (data) {
      let shareCost = data * qty
      if (shareCost > balance) {
        return 'Share cost is greater than your current balance!'
      } else {
        let updatedBalance = (balance - shareCost).toFixed(2)
        const response = await axios.post(`/api/account/${userId}`, {
          symbol,
          qty,
          updatedBalance
        })
        return dispatch(buyStock(response.data))
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export default function(state = defaultAccount, action) {
  console.log('state', state)
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
