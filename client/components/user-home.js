import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {UserAccount} from './user-account'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    // <div id="homepage">
    //   <div className="row">
    //     <div className="col s3" />
    //     <div className="col s6 welcome">
    //       <h4 className="center-align">Portfolio ({email})</h4>
    //       <br />
    //     </div>
    //     <div className="portfolio-wrapper">
    //       <div className="user-portfolio">

    //       </div>
    //       <div className="user-account">

    //       </div>

    //     </div>
    //   </div>
    // </div>
    <div className="container">
      <h3 className="left-align">Portfolio (xxxx)</h3>
      {/* <div className="container" style={{ marginLeft: "0px", marginRight: "0px" }}> */}
      <br />
      <div className="row">
        {/* <div class="col s7 push-s5">
            <span class="flow-text">This div is 7-columns wide on pushed to the right by 5-columns.
            </span>
          </div>
          <div class="col s5 pull-s7">
            <span class="flow-text">5-columns wide pulled to the left by 7-columns.
            </span>
          </div> */}
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
          <UserAccount />
        </div>
      </div>
      {/* </div > */}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
