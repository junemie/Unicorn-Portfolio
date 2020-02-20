import axios from 'axios'

const GET_TRANACTIONS = 'GET_TRANSACTIONS'

const defaultState = []

const getTransactions = transactions => ({
  type: GET_TRANACTIONS,
  transactions
})

export const gotTransactions = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/transaction/${userId}`)
    dispatch(getTransactions(data))
  } catch (error) {
    console.log(err)
  }
}

export default function(state = defaultState, action) {
  console.log('state', state)
  switch (action.type) {
    case GET_TRANACTIONS:
      return [...action.transactions]
    default:
      return state
  }
}
