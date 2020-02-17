import axios from 'axios'

const GET_PORTFOLIO = 'GET PORTFOLIO'

const defaultAccount = {}

const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})

export const gotPortfolio = userId => async dispatch => {
  try {
    console.log('hey', typeof userId)
    const {data} = await axios.get(`/api/account/${userId}`)
    dispatch(getPortfolio(data))
  } catch (err) {
    console.log(err)
  }
}

export default function(state = defaultAccount, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return {...action.portfolio}
    default:
      return state
  }
}
