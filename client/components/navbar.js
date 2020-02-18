import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    {isLoggedIn ? (
      <React.Fragment>
        <nav className="nav-center">
          <div className="nav-wrapper container">
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/transaction">Transactions</Link>
              </li>
              <li>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    ) : (
      <div />
    )}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
