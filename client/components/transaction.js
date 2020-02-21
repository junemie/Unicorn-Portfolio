import React, {Component} from 'react'
import {gotTransactions} from '../store/transaction'
import {connect} from 'react-redux'
import * as moment from 'moment'
import {Spinner} from './spinner'

const style = {
  color: '#2bbbad'
}

class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    const {userId} = this.props
    await this.props.gotTransactions(userId)
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
    return !this.state.isLoading ? (
      <div className="container">
        <h3 className="left-align tracking-in-expand">Transactions</h3>
        <div className="row">
          <div
            className="col s6"
            style={{magrindLeft: '0px', paddingLeft: '0px'}}
          >
            <table className="highlight centered">
              <thead style={style}>
                <tr>
                  <th>Date</th>
                  <th>Symbol</th>
                  <th>Equity</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => {
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
                        ${(
                          transaction.quantity * transaction.sharePrice
                        ).toFixed(2)}
                        <br />
                        <span style={{color: 'grey'}}>
                          ({transaction.quantity}) shares at ${
                            transaction.sharePrice
                          }
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
      <div className="spinner">
        <Spinner />
      </div>
    )
  }
}

const mapState = state => {
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
