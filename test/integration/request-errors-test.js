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
    github.plugin(require('../../lib/plugins/endpoint-methods'))

    return github.orgs.get({org: 'myorg'})

    .catch(error => {
      expect(error.name).to.equal('HttpError')
      expect(error.code).to.equal(504)
      expect(error).to.have.property('stack')
    })
  })

  it('500', () => {
    nock('https://request-errors-test.com')
      .get('/orgs/myorg')
      .replyWithError('ooops')

    const github = new GitHub({
      host: 'request-errors-test.com'
    })
    github.plugin(require('../../lib/plugins/endpoint-methods'))

    return github.orgs.get({org: 'myorg'})

    .catch(error => {
      expect(error.name).to.equal('HttpError')
      expect(error.code).to.equal(500)
      expect(error).to.have.property('stack')
    })
  })

  it('404', () => {
    nock('https://request-errors-test.com')
      .get('/orgs/myorg')
      .reply(404, 'not found')

    const github = new GitHub({
      host: 'request-errors-test.com',
      timeout: 1000
    })
    github.plugin(require('../../lib/plugins/endpoint-methods'))

    return github.orgs.get({org: 'myorg'})

    .catch(error => {
      expect(error.name).to.equal('HttpError')
      expect(error.code).to.equal(404)
      expect(error).to.have.property('stack')
    })
  })

  it('401', () => {
    nock('https://request-errors-test.com')
      .get('/orgs/myorg')
      .reply(401)

    const github = new GitHub({
      host: 'request-errors-test.com',
      timeout: 1000
    })
    github.plugin(require('../../lib/plugins/endpoint-methods'))

    return github.orgs.get({org: 'myorg'})

    .catch(error => {
      expect(error.name).to.equal('HttpError')
      expect(error.code).to.equal(401)
      expect(error).to.have.property('stack')
    })
  })
})
