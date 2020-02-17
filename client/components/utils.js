const isValidNumber = () => (num % 1 !== 0)

const canPurchase = (amount, price, unit) => {
  let totalPrice = unit * price
  if (amount < totalPrice) {
    return false
  }
  return true
}
