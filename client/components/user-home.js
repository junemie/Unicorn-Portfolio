import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {UserAccount} from './user-account'
import {gotPortfolio} from '../store/account'
/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stocks: []
    }
  }

  async componentDidMount() {
    // await this.props.gotAllProducts();
    if (this.props.userId) {
      // console.log("propppps", this.props.userId);
      await this.props.gotPortfolio(Number(this.props.userId))
    }

    // if (this.props.userId) {
    //   await this.props.getPortfolio(Number(this.props.user.id))
    // }
    // const portfolio = this.props.products.map(product => {
    //   product.quantity = 1;
    //   return product
    // })
    //   this.setState({ orderProduct })
  }

  render() {
    const {email, userI, balance} = this.props
    return (
      <div className="container">
        <h3 className="left-align">Portfolio</h3>
        <br />
        <div className="row">
          <div className="col s6">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Item Name</th>
                  <th>Item Price</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Alvin</td>
                  <td>Eclair</td>
                  <td>$0.87</td>
                </tr>
                <tr>
                  <td>Alan</td>
                  <td>Jellybean</td>
                  <td>$3.76</td>
                </tr>
                <tr>
                  <td>Jonathan</td>
                  <td>Lollipop</td>
                  <td>$7.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col s5">
            <UserAccount balance={balance} />
          </div>
        </div>
        {/* </div > */}
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
    balance: state.user.balance
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
