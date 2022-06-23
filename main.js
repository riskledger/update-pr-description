const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('token', { required: true });
const body = core.getInput('body', { required: true });
const jiraBaseUrl = core.getInput('body', { required: true });

const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');

const prNum = github.context.payload.pull_request.number;
const branchName = github.context.ref;

const octokit = github.getOctokit(token);

const template = `
[Jira](${jiraBaseUrl}/${branchName})

---

`;

const finalBody = template.concat(body);

console.log(finalBody);

octokit.pulls.update({
  owner: repoOwner,
  repo: repoName,
  body: finalBody,
  pull_number: prNum,
});
