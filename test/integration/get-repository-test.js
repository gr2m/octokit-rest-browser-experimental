require('../mocha-options')
const fixtures = require('@octokit/fixtures')
const GitHub = require('../../')

describe('api.github.com', () => {
  it('github.repos.get({owner: "octokit-fixture-org", repo: "hello-world"})', () => {
    const GitHubMock = fixtures.mock('api.github.com/get-repository')

    const github = new GitHub()

    return github.repos.get({
      owner: 'octokit-fixture-org',
      repo: 'hello-world',
      // TODO: remove once #587 is resolved
      headers: {
        accept: 'application/vnd.github.v3+json'
      }
    })

    .then((response) => {
      expect(response.data.owner.login).to.equal('octokit-fixture-org')
      expect(GitHubMock.pending()).to.deep.equal([])
    })

    .catch(GitHubMock.explain)
  })
})
