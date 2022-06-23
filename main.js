const core = require('@actions/core');
const github = require('@actions/github');

try {
  work()
} catch (error) {
  core.setFailed(error.message);
}

async function work() {
  const token = core.getInput('token', { required: true });
  const body = core.getInput('body', { required: true });
  const jiraBaseUrl = core.getInput('jiraBaseUrl', { required: true });

  const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');
  const githubContext = github.context;
  const githubContextPayload = githubContext.payload;
  const prNum = githubContextPayload.pull_request.number;
  const octokit = github.getOctokit(token);

  console.log(githubContext);

  const prInfo = await octokit.rest.pulls.get({
    owner: repoOwner,
    repo: repoName,
    pull_number: prNum,
  });

  console.log(prInfo);

  const [branchType, ticketNumber] = branchName.split('/');


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
}






