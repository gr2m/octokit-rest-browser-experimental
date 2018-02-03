require('../mocha-options')
const fixtures = require('@octokit/fixtures')
const GitHub = require('../../')

describe('api.github.com', () => {
  it('github.search.issues({q: "sesame repo:octokit-fixture-org/search-issues"})', () => {
    const GitHubMock = fixtures.mock('api.github.com/search-issues')

    const githubUserA = new GitHub()

    githubUserA.authenticate({
      type: 'token',
      token: '0000000000000000000000000000000000000001'
    })

    return githubUserA.search.issues({q: 'sesame repo:octokit-fixture-org/search-issues'})

    .then((response) => {
      expect(response.data.total_count).to.equal(2)
      expect(GitHubMock.pending()).to.deep.equal([])
    })

    .catch(GitHubMock.explain)
  })
})
