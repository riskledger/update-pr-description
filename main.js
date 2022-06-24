const core = require('@actions/core');
const github = require('@actions/github');


async function work() {
  try {
    const token = core.getInput('token', { required: true });
    const body = core.getInput('body', { required: true });
    const jiraBaseUrl = core.getInput('jiraBaseUrl', { required: true });

    const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');
    const githubContext = github.context;
    const githubContextPayload = githubContext.payload;
    const prNum = githubContextPayload.pull_request.number;
    const octokit = github.getOctokit(token);


    //To get more details about the PR
    const prInfo = await octokit.rest.pulls.get({
      owner: repoOwner,
      repo: repoName,
      pull_number: prNum,
    });

    const branchName = prInfo.data.head.ref;

    //Split the branch name on the '/' char to get the ticket number
    const [branchType, ticketNumber] = branchName.split('/');

    //TODO: add figma link
    const template = `
    [Jira](${jiraBaseUrl}/${ticketNumber})

    ---
    
    `;

    const finalBody = template.concat(body);

    octokit.rest.pulls.update({
      owner: repoOwner,
      repo: repoName,
      body: finalBody,
      pull_number: prNum,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

work()






