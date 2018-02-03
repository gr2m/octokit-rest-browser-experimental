require('../mocha-options')
const fixtures = require('@octokit/fixtures')
const GitHub = require('../../')

describe('api.github.com', () => {
  it('github.issues.*', () => {
    const GitHubMock = fixtures.mock('api.github.com/labels')
    const githubUserA = new GitHub()

    githubUserA.authenticate({
      type: 'token',
      token: '0000000000000000000000000000000000000001'
    })

    return githubUserA.issues.getLabels({
      owner: 'octokit-fixture-org',
      repo: 'labels'
    })

    .then((result) => {
      expect(result.data).to.be.an('array')

      return githubUserA.issues.createLabel({
        owner: 'octokit-fixture-org',
        repo: 'labels',
        name: 'test-label',
        color: '663399'
      })
    })

    .then((result) => {
      expect(result.data.name).to.equal('test-label')

      return githubUserA.issues.getLabel({
        owner: 'octokit-fixture-org',
        repo: 'labels',
        name: 'test-label'
      })
    })

    .then(() => {
      return githubUserA.issues.updateLabel({
        owner: 'octokit-fixture-org',
        repo: 'labels',
        oldname: 'test-label',
        name: 'test-label-updated',
        color: 'BADA55'
      })
    })

    .then((result) => {
      expect(result.data.name).to.equal('test-label-updated')

      return githubUserA.issues.deleteLabel({
        owner: 'octokit-fixture-org',
        repo: 'labels',
        name: 'test-label-updated'
      })
    })

    .then((result) => {
      expect(result.data).to.equal('')

      expect(GitHubMock.pending()).to.deep.equal([])
    })

    .catch(GitHubMock.explain)
  })
})
