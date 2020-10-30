const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('token', { required: true });
const body = core.getInput('body', { required: true });

const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');

const prNum = github.context.payload.pull_request.number;

const octokit = github.getOctokit(token);

octokit.pulls.update({
  owner: repoOwner,
  repo: repoName,
  body: body,
  pull_number: prNum,
});
