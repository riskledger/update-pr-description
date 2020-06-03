const cp = require('child_process');
cp.execSync(`cd ${__dirname}; yarn install --frozen-lockfile`);

const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('token', {
  required: true,
});
const body = core.getInput('body', {
  required: true,
});

const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');

const fs = require('fs');
const ev = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
const prNum = ev.pull_request.number;

const octokit = new github.GitHub(token);

octokit.pulls.update({
  owner: repoOwner,
  repo: repoName,
  body: JSON.parse(body),
  pull_number: prNum,
});