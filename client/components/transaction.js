import React, {Component} from 'react'
import {gotTransactions} from '../store/transaction'
import {connect} from 'react-redux'
import * as moment from 'moment'
class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }
  // const {portfolio} = props  // const style = {
  //   color: '#2bbbad'
  // }
  async componentDidMount() {
    const {gotTransactions, userId} = this.props
    await gotTransactions(userId)
    if (this.props.transactions) {
      this.setState({
        isLoading: false
      })
    }
  }

  dateFormat(date) {
    return moment(date).format('MM/DD/YYYY')
  }

  render() {
    const {transactions} = this.props
    console.log('this', this.props)
    return !this.state.isLoading ? (
      <div className="container">
        <h3 className="left-align">History</h3>
        <div className="row">
          <div
            className="col s6"
            style={{magrindLeft: '0px', paddingLeft: '0px'}}
          >
            <table className="highlight centered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Symbol</th>
                  <th>Shares</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => {
                  let num = transaction.quantity * transaction.sharePrice
                  console.log(num.toFixed(2))
                  return (
                    <tr key={transaction.id}>
                      <td>
                        {moment(transaction.createdAt).format('MM/DD/YYYY')}{' '}
                        <br />
                      </td>
                      <td>
                        {transaction.ticker} <br />
                      </td>
                      <td>
                        {' '}
                        {}
                        {/* $${transaction.sharePrice} */}
                        ${(
                          transaction.quantity * transaction.sharePrice
                        ).toFixed(2)}
                        <br />
                        <span>
                          ({transaction.quantity}) shares at ${transaction}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>{' '}
        </div>
      </div>
    ) : (
      <div>spinner</div>
    )
  }
}

const mapState = state => {
  console.log('THIS IS THE STATE', state)
  return {
    userId: state.user.id,
    transactions: state.transaction
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotTransactions: userId => dispatch(gotTransactions(userId))
  }
}

export default connect(mapState, mapDispatchToProps)(Transaction)
