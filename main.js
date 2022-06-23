const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('token', { required: true });
const body = core.getInput('body', { required: true });
const jiraBaseUrl = core.getInput('jiraBaseUrl', { required: true });


console.log(github.context);
const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');
console.log(repoOwner);
console.log(repoName);
const prNum = github.context.payload.pull_request.number;
console.log(prNum);
const branchName = github.context.ref;
console.log(branchName);
const [branchType, ticketNumber] = branchName.split('/');
console.log(branchType);
console.log(ticketNumber);
const octokit = github.getOctokit(token);


const template = `
[Jira](${jiraBaseUrl}/${ticketNumber})

---

`;

const finalBody = template.concat(body);

console.log(finalBody);

octokit.rest.pulls.update({
  owner: repoOwner,
  repo: repoName,
  body: finalBody,
  pull_number: prNum,
});
