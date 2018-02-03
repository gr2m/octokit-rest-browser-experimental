require('../mocha-options')
const fixtures = require('@octokit/fixtures')
const GitHub = require('../../')

describe('api.github.com', () => {
  it('github.repos.getContent({owner: "octokit-fixture-org", repo: "hello-world", path: ""})', () => {
    const GitHubMock = fixtures.mock('api.github.com/get-content')

    const github = new GitHub()

    return github.repos.getContent({owner: 'octokit-fixture-org', repo: 'hello-world', path: ''})

    .then((response) => {
      expect(response.data.length).to.equal(1)
      expect(GitHubMock.pending()).to.deep.equal([])
    })

    .catch(GitHubMock.explain)
  })
})
