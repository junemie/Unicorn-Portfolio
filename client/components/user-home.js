import React, {Component} from 'react'
import {connect} from 'react-redux'
import {PurchaseForm} from './purchaseForm'
import {Portfolio} from './portfolio'
import {gotPortfolio, checkedSymbols, boughtStock} from '../store/account'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isError: false
    }
  }

  async componentDidMount() {
    if (this.props.userId) {
      await this.props.gotPortfolio(Number(this.props.userId))
      this.setState({isLoading: false})
    }
  }

  submitHandler = async e => {
    console.log('HELLOOOO', this.props)
    e.preventDefault()
    const symbol = e.target.symbol.value
    const quantity = Number(e.target.quantity.value)

    await this.props.checkedSymbols(symbol)
    console.log()
    if ((Number.isInteger(quantity), quantity > 1, this.props.isSymbol)) {
      await this.props.boughtStock(symbol, quantity, this.props.userId)
    } else {
      this.setState({isError: true})
    }
  }

  render() {
    const {email, userId, balance, portfolio} = this.props
    const isLoading = this.state.isLoading
    return !isLoading ? (
      <div className="container">
        <h3 className="left-align">Portfolio</h3>
        <div className="row">
          <div
            className="col s6"
            style={{magrindLeft: '0px', paddingLeft: '0px'}}
          >
            <Portfolio portfolio={portfolio} />
          </div>
          <div className="col s5" style={{marginLeft: '30px'}}>
            <PurchaseForm
              balance={balance}
              submitHandler={this.submitHandler}
              isError={this.state.isError}
            />
          </div>
        </div>
      </div>
    ) : (
      <div>spinner</div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    userId: state.user.id,
    balance: state.user.balance,
    portfolio: state.account.portfolio,
    isSymbol: state.account.isSymbol
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotPortfolio: userId => dispatch(gotPortfolio(userId)),
    checkedSymbols: symbol => dispatch(checkedSymbols(symbol)),
    boughtStock: (symbol, qty, userId) =>
      dispatch(boughtStock(symbol, qty, userId))
  }
}

export default connect(mapState, mapDispatchToProps)(UserHome)
