import React, {Component} from 'react'
import {connect} from 'react-redux'
import {PurchaseForm} from './purchaseForm'
import {Portfolio} from './portfolio'
import {Spinner} from './spinner'
import {gotPortfolio, checkedSymbols, boughtStock} from '../store/account'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isError: false,
      balance: this.props.balance,
      message: ''
    }
  }

  async componentDidMount() {
    if (this.props.userId) {
      this.setState({
        isLoading: true
      })
      await this.props.gotPortfolio(Number(this.props.userId))
      this.setState({
        isLoading: false
      })
    }
  }

  submitHandler = e => {
    e.preventDefault()
    const symbol = e.target.symbol.value
    let balance = Number(this.state.balance)
    let quantity = Number(e.target.quantity.value)
    this.setState({isLoading: true})
    this.formCheckHandler(symbol, balance, quantity)
  }

  async formCheckHandler(symbol, balance, quantity) {
    await this.props.checkedSymbols(symbol)

    //Check if the quantity and symbol is valid before making purchase
    if (Number.isInteger(quantity) && quantity > 0 && this.props.isSymbol) {
      await this.props.boughtStock(symbol, quantity, this.props.userId, balance)
      await this.props.gotPortfolio(Number(this.props.userId))
      //Check if there is enough funds in the account
      if (this.props.newBalance === Number(this.state.balance)) {
        this.setState({
          isError: true,
          isLoading: false,
          message:
            '* Insufficient fund. Please make a deposit before purchasing.'
        })
      } else {
        //If purchase was successfully made, update the balance to newBalance
        this.setState({
          isError: false,
          balance: this.props.newBalance,
          isLoading: false
        })
      }
    } else {
      //If the symbol or quantity is invalid - set the error message
      this.setState({
        isLoading: false,
        isError: true,
        message: '* Invalid Symbol or quantity. Please try again'
      })
    }
  }

  render() {
    const {portfolio} = this.props
    const isLoading = this.state.isLoading
    return !isLoading ? (
      <div className="container">
        <h3 className="left-align tracking-in-expand">Portfolio</h3>
        <div className="row">
          <div
            className="col s6"
            style={{magrindLeft: '0px', paddingLeft: '0px'}}
          >
            <Portfolio portfolio={portfolio} />
          </div>
          <div className="col s5" style={{marginLeft: '30px'}}>
            <PurchaseForm
              balance={this.state.balance}
              submitHandler={this.submitHandler}
              isError={this.state.isError}
              message={this.state.message}
            />
          </div>
        </div>
      </div>
    ) : (
      <div className="spinner">
        <Spinner />
      </div>
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
    method: state.user.method,
    balance: state.user.balance,
    portfolio: state.account.portfolio,
    isSymbol: state.account.isSymbol,
    newBalance: state.account.newBalance
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotPortfolio: userId => dispatch(gotPortfolio(userId)),
    checkedSymbols: symbol => dispatch(checkedSymbols(symbol)),
    boughtStock: (symbol, qty, userId, balance) =>
      dispatch(boughtStock(symbol, qty, userId, balance))
  }
}

export default connect(mapState, mapDispatchToProps)(UserHome)
