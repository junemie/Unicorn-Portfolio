import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {PurchaseForm} from './purchaseForm'
import {Portfolio} from './portfolio'
import {gotPortfolio} from '../store/account'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    if (this.props.userId) {
      await this.props.gotPortfolio(Number(this.props.userId))
      this.setState({isLoading: false})
    }
  }

  render() {
    console.log('all props', this.props)
    const {email, userId, balance, portfolio} = this.props
    const isLoading = this.state.isLoading
    return !isLoading ? (
      <div className="container">
        <h3 className="left-align">Portfolio</h3>
        <br />
        <div className="row">
          <div
            className="col s6"
            style={{magrindLeft: '0px', paddingLeft: '0px'}}
          >
            <Portfolio portfolio={portfolio} />
          </div>
          <div className="col s5" style={{marginLeft: '30px'}}>
            <PurchaseForm balance={balance} />
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
  console.log('hi there', state)
  return {
    email: state.user.email,
    userId: state.user.id,
    balance: state.user.balance,
    portfolio: state.account
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotPortfolio: userId => dispatch(gotPortfolio(userId))
  }
}

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
