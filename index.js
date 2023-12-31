const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/core");


const commitRE = /^((feat|fix|docs|style|core|i18n|a11y|report|misc|cli|audits|improve|security|deprecated|refactor|perf|test|workflow|build|ci|chore|types|wip|release|deps?|merge|examples?|revert)(\(.+\))?(\:|\!\:)|(Merge|Revert|Version)) .{1,200}$/;

try {
    const githubToken = core.getInput('github-token');
    const maximumCommitNumber = core.getInput('maximum-commit-number');
    const octokit = new Octokit({ auth: githubToken });
    const prNumber = github.context.payload.pull_request.number;
    // fetch pr commit
    octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/commits', {
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        pull_number: prNumber
    }).then((response) => {
        // const commits = response.data.commit;
        // console.log(JSON.stringify(commits))
        // get commit message from response
        const commits = response.data.map(commit => commit.commit.message);
        if (Number(maximumCommitNumber) && commits.length > Number(maximumCommitNumber)) {
            core.setFailed(`Too many commits in this PR, please squash them into smaller number of commits.\n`)
        }

        for (let commit of commits) {
            if (!commitRE.test(commit)) {
                core.setFailed(`Invalid commit message: ${commit} \n See convention.md for more details.\n`);
                return;
            }
        }
    });
    core.setOutput("Pass", " See convention.md for more details.\n");
    
} catch (error) {
    core.setFailed(error.message);
}