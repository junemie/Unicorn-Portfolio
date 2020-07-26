'use strict'
/* global describe it */

const seed = require('./seed')

describe('seed script', async () => {
  let seedFile = await seed
  it('completes successfully', seedFile)
})
