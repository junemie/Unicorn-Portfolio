import React from 'react'

export const PurchaseForm = props => {
  const {balance} = props

  let styledInput = {
    border: 'solid #d8d3d3 1px',
    borderRadius: '3px'
  }

  return (
    <div className="col card">
      <form>
        <div className="card-content" style={{paddin: '9px'}}>
          <div
            className="card-title"
            style={{textAlign: 'center', color: '#2bbbad'}}
          >
            <h5>Balance - ${balance}</h5>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="ticker">
                <span style={{paddingLeft: '5px'}}>ticker</span>
              </label>
              <input name="ticker" type="text" style={styledInput} required />
            </div>
            <div className="input-field col s12">
              <label htmlFor="qty">
                <span style={{paddingLeft: '5px'}}>Qty</span>
              </label>
              <input name="qty" type="text" style={styledInput} required />
            </div>
            <div className="col s12">
              <button
                className="btn waves-effect waves-light right-align"
                type="submit"
                name="action"
              >
                BUY
              </button>
            </div>
            {/* {name === 'login' ? (
                  <div className="col s12">
                    <span>New to us?</span> <Link to="/signup">Sign Up</Link>
                  </div>
                ) : (
                    <div className="col s12">
                      <Link to="/login">Already have an account?</Link>
                    </div>
                  )} */}
            {/* {error &&
                  error.response && (
                    <div className="col s12" style={{ color: '#fc7070' }}>
                      {' '}
                      {error.response.data}{' '}
                    </div>
                  )} */}
          </div>
        </div>
      </form>
    </div>
  )
}
