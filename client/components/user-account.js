import React from 'react'

export const UserAccount = props => {
  const {balance} = props

  let styledInput = {
    border: 'solid #d8d3d3 1px',
    borderRadius: '3px',
    width: '400px'
  }

  let styledInputFieldCol = {
    paddingLeft: '0px',
    paddingRight: '0px'
  }

  let styledHtmlFor = {
    paddingLeft: '10px'
  }

  return (
    <div className="account-container">
      <div className="col card" style={{marginLeft: '50px'}}>
        <form name={name}>
          <div className="card-content" style={{padding: '0px'}}>
            <h5
              className="card-title"
              style={{textAlign: 'center', color: '#2bbbad', marginTop: '10px'}}
            >
              Balance - ${balance}
            </h5>
            <div className="row">
              <div className="input-field col">
                <div className="input-field col" style={styledInputFieldCol}>
                  <label htmlFor="ticker" style={styledHtmlFor}>
                    <small>ticker</small>
                  </label>
                  <input
                    name="ticker"
                    type="text"
                    style={styledInput}
                    required
                  />
                </div>

                <div className="input-field col" style={styledInputFieldCol}>
                  <label htmlFor="qty" style={styledHtmlFor}>
                    <small>Qty</small>
                  </label>
                  <input name="qty" type="text" style={styledInput} required />
                </div>
                <div
                  className="col s12"
                  style={{paddingLeft: '0px', paddingRight: '0px'}}
                >
                  <button
                    className="btn waves-effect waves-light right-align"
                    type="submit"
                    name="action"
                    style={{marginLeft: '10px', width: '405px'}}
                  >
                    BUY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
