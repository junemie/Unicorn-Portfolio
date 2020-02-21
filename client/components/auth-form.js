import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {'Unicorn '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

/**
 * COMPONENT
 */

const AuthForm = props => {
  const classes = useStyles()
  const {name, displayName, handleSubmit, error} = props
  console.log('proppppps', name)
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {name === 'login' ? 'Login' : 'Sign Up'}
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          noValidate
          name={name}
        >
          <Grid container spacing={2}>
            {name === 'login' ? null : (
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="accountName"
                  variant="outlined"
                  required
                  fullWidth
                  id="accountName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Button
              type="submit"
              name="action"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {displayName}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                {name === 'login' ? (
                  <Link to="/signup">New to Us? Sign Up</Link>
                ) : (
                  <Link to="/login">Already have an account?</Link>
                )}
              </Grid>
            </Grid>
            <div className="row">
              {error &&
                error.response && (
                  <div className="col s12" style={{color: '#fc7070'}}>
                    {' '}
                    {error.response.data}{' '}
                  </div>
                )}
            </div>
          </Grid>
        </form>
      </div>
    </Container>
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
