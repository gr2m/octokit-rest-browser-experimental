require('../mocha-options')
const fixtures = require('@octokit/fixtures')
const GitHub = require('../../')

describe('api.github.com', () => {
  it('github.orgs.get({owner: "octokit-fixture-org"})', () => {
    const GitHubMock = fixtures.mock('api.github.com/get-organization')

    const github = new GitHub()

    return github.orgs.get({org: 'octokit-fixture-org'})

    .then((response) => {
      expect(response.data.login).to.equal('octokit-fixture-org')
      expect(GitHubMock.pending()).to.deep.equal([])
    })

    .catch(GitHubMock.explain)
  })
})
