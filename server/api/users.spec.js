/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/ creates user in the User table', () => {
    const codysEmail = 'cody@puppybook.com'
    const codyName = 'cody pug'
    const codyPassword = 'shhhh secret!'

    beforeEach(() => {
      return User.create({
        name: codyName,
        email: codysEmail,
        password: codyPassword
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  })
})
