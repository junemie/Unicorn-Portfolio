import React from 'react'

export const Portfolio = props => {
  const style = {
    color: '#2bbbad'
  }
  const {portfolio} = props
  return (
    <table className="highlight centered">
      <thead style={style}>
        <tr>
          <th>Symbol</th>
          <th>Shares</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {portfolio ? (
          portfolio.map(stock => {
            return (
              <tr key={stock.id}>
                <td>{stock.ticker}</td>
                <td>{stock.quantity}</td>
                <td>
                  ${stock.shareCost}
                  <br />
                  <span>${stock.sharePrice} / share</span>
                </td>
              </tr>
            )
          })
        ) : (
          <div />
        )}
      </tbody>
    </table>
  )
}
