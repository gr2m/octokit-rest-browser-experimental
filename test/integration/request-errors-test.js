require('../mocha-options')
const nock = require('nock')
const GitHub = require('../../')

describe('request errors', () => {
  it('timeout', () => {
    nock('https://request-errors-test.com')
      .get('/orgs/myorg')
      .socketDelay(2000)
      .reply(200, {})

    const github = new GitHub({
      host: 'request-errors-test.com',
      timeout: 1000
    })

    return github.orgs.get({org: 'myorg'})

    .catch(error => {
      // getting "TypeError: request.setTimeout is not a function(…)"
      // when running this test in the browser
      console.log(error)
      expect(error.code).to.equal('504')
    })
  })

  it('500', () => {
    nock('https://request-errors-test.com')
      .get('/orgs/myorg')
      .replyWithError('ooops')

    const github = new GitHub({
      host: 'request-errors-test.com',
      timeout: 1000
    })

    return github.orgs.get({org: 'myorg'})

    .catch(error => {
      console.log(error)
      expect(error.code).to.equal('500')
    })
  })
})
