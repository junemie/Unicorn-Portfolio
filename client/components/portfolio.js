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

const style = {
  color: '#2bbbad'
}
export const Portfolio = props => {
  const {portfolio} = props
  console.log('prices', portfolio)

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
                      color: `${colors(stock.sharePrice, stock.openPrice)}`
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
