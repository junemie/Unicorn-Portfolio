/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(async () => {
    return await db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      //await for the response
      beforeEach(async () => {
        cody = await User.create({
          name: 'cody pug',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', async () => {
        let correctPassword = await cody.correctPassword('bones')
        expect(correctPassword).to.be.equal(true)
      })

      it('returns false if the password is incorrect', async () => {
        let incorrectPassword = await cody.correctPassword('bonez')
        expect(incorrectPassword).to.be.equal(false)
      })
    })
  })
})
