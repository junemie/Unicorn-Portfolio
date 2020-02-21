import React from 'react'

const colors = (currentPrice, openPrice) => {
  if (currentPrice < openPrice) {
    return 'red'
  } else if (currentPrice === openPrice) {
    return 'grey'
  } else {
    return 'green'
  }
}

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
          <th>Equity</th>
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
                  <span
                    style={{
                      backgroundColor: '#fefefe',
                      color: `${colors(
                        portfolio.sharePrice,
                        portfolio.openPrice
                      )}`
                    }}
                  >
                    ${stock.sharePrice} / share{' '}
                  </span>
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
