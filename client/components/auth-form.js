import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="form-container">
      <div className="valign-wrapper row login-box">
        <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
          <form onSubmit={handleSubmit} name={name}>
            <div className="card-content">
              <h5 className="card-title">
                {name === 'login' ? 'SIGN IN' : 'REGISTER'}
              </h5>
              <div className="row">
                {name === 'login' ? null : (
                  <div className="input-field col s12">
                    <label htmlFor="accountName">
                      <small>Full Name</small>
                    </label>
                    <input name="accountName" type="text" required />
                  </div>
                )}
                <div className="input-field col s12">
                  <label htmlFor="email">
                    <small>Email</small>
                  </label>
                  <input name="email" type="text" required />
                </div>
                <div className="input-field col s12">
                  <label htmlFor="password">
                    <small>Password</small>
                  </label>
                  <input name="password" type="password" required />
                </div>
                <div className="col s12">
                  <button
                    className="btn waves-effect waves-light right-align #ab47bc purple lighten-1"
                    type="submit"
                    name="action"
                  >
                    {displayName}
                  </button>
                </div>
                {name === 'login' ? (
                  <div className="col s12">
                    <Link to="/signup">Sign Up</Link>
                  </div>
                ) : (
                  <div className="col s12">
                    <Link to="/login">Already have an account?</Link>
                  </div>
                )}
                {error &&
                  error.response && (
                    <div className="col s12"> {error.response.data} </div>
                  )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const accountName =
        formName === 'signup' ? evt.target.accountName.value : ''
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(accountName, email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
