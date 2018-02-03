require('../mocha-options')

const GitHub = require('../../')
const nock = require('nock')

/* eslint-env mocha */
/* global cy */
/* eslint-disable no-unused-expressions */
describe.only('deprecations', () => {
  beforeEach(() => {
    cy.stub(console, 'warn')
  })

  it('github.integrations.*', () => {
    nock('https://deprecations-test.com')
      .get('/app/installations')
      .reply(200, [])

    const github = new GitHub({
      host: 'deprecations-test.com'
    })
    return github.integrations.getInstallations({})
    .then(() => {
      expect(console.warn).to.be.calledTwice
    })
  })

  it('deprecated followRedirects option', () => {
    GitHub({
      followRedirects: false
    })
    expect(console.warn).to.be.calledOnce
  })

  it('deprecated Promise option', () => {
    GitHub({
      Promise: {}
    })
    expect(console.warn).to.be.calledOnce
  })
})
