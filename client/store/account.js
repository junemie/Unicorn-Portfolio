import axios from 'axios'

import {key} from '../../secrets'
import {SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION} from 'constants'

const GET_PORTFOLIO = 'GET PORTFOLIO'
const CHECK_SYMBOL = 'CHECK_SYMBOL'
const BUY_STOCK = 'BUY_STOCK'

const defaultAccount = {
  portfolio: [],
  status: false
}

const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})
const checkSymbol = status => ({type: CHECK_SYMBOL, status})
const buyStock = () => ({type: BUY_STOCK})

export const gotPortfolio = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/account/${userId}`)
    dispatch(getPortfolio(data))
  } catch (err) {
    console.log(err)
  }
}

export const checkedSymbols = searchSymbol => async dispatch => {
  try {
    const {data} = await axios.get(
      `https://sandbox.iexapis.com/beta/ref-data/symbols?token=${key}`
    )
    let response = data.some(symbol => symbol.symbol === searchSymbol)
    dispatch(checkSymbol(response))
  } catch (err) {
    console.log(err)
  }
}

export const boughtStock = (symbol, qty, userId) => async dispatch => {
  try {
    const response = await axios.post(`/api/account/${userId}`, {symbol, qty})
    return dispatch(buyStock(response))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = defaultAccount, action) {
  console.log('state', state)
  switch (action.type) {
    case GET_PORTFOLIO:
      console.log({...action.portfolio})
      return {...state, portfolio: [...action.portfolio]}
    case CHECK_SYMBOL:
      return {...state, symbol: action.status}
    default:
      return state
  }
}
