'use strict'

const db = require('../server/db')
const {User, Stock} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({name: 'user1', email: 'user1@gmail.com', password: 'user1'}),
    User.create({name: 'user2', email: 'user2@email.com', password: 'user2'})
  ])

  const stocks = await Promise.all([
    Stock.create({ticker: 'AA', quantity: 20}),
    Stock.create({ticker: 'AAT', quantity: 30})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${stocks.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
