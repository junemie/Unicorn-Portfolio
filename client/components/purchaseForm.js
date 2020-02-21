import React from 'react'

export const PurchaseForm = props => {
  const {balance, submitHandler, isError, message} = props

  let styledInput = {
    border: 'solid #d8d3d3 1px',
    borderRadius: '3px'
  }

  return (
    <div className="col card">
      <form onSubmit={submitHandler}>
        <div className="card-content" style={{paddin: '9px'}}>
          <div
            className="card-title"
            style={{textAlign: 'center', color: '#2bbbad'}}
          >
            <h5>Balance - ${balance}</h5>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="symbol">
                <span style={{paddingLeft: '5px'}}>symbol</span>
              </label>
              <input name="symbol" type="text" style={styledInput} required />
            </div>
            <div className="input-field col s12">
              <label htmlFor="quantity">
                <span style={{paddingLeft: '5px'}}>Qty</span>
              </label>
              <input name="quantity" type="text" style={styledInput} required />
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

            {isError && (
              <div
                className="col s12"
                style={{color: '#fc7070', fontSize: '12px'}}
              >
                {' '}
                {message}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
