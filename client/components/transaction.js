import React, {Component} from 'react'
import {gotTransactions} from '../store/transaction'
import {connect} from 'react-redux'

class Transaction extends Component {
  constructor(props) {
    super(props)
  }
  // const {portfolio} = props  // const style = {
  //   color: '#2bbbad'
  // }
  async componentDidMount() {
    const {gotTransactions, userId} = this.props
    let transactions = await gotTransactions(userId)
    console.log(transactions)
  }

  render() {
    const {transactions} = this.props
    return (
      <table className="highlight centered striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Symbol</th>
            <th>Shares</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1/2/2020</td>
            <td>AAPL</td>
            <td>
              #212.20
              <br />
              <span>83 shares at $2.12</span>
            </td>
          </tr>
          {/* {transactions.map(transaction => {
          return (
            <tr key={stock.id}>
              <td>{stock.ticker}</td>
              <td>{stock.quantity}</td>
              <td>xxx</td>
            </tr>
          )
        })} */}
        </tbody>
      </table>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    transactions: state.transactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotTransactions: userId => dispatch(gotTransactions(userId))
  }
}

export default connect(mapState, mapDispatchToProps)(Transaction)
