'use strict';

const fs = require('fs');
const gitP = require('simple-git/promise');
const path = require('path');
const { GitWatcher } = require('git-repo-watch');
const { request } = require('graphql-request');

const graphQlServer = 'http://localhost:4466/chromium-dashboard-master/dev';
const pollersDir = path.join(__dirname, '.git_pollers_cache');

function createDirectoryIfNotExists(dir) {
  if (fs.existsSync(dir)) return;

  fs.mkdirSync(dir);
}

function addCommitToChromiumSource(sourceId, sourceUrl, commitContent) {
  const contents = commitContent.replace(/\"/g, '').split('\n');

  const revision = contents[0];
  const author = contents[1];
  const date = contents[2];
  const subject = contents[3];
  const url = `${sourceUrl}/commit/${revision}`;

  const createCommit = `
    mutation {
      createCommit(
       data:{
          revision: "${revision}"
          author: "${author}"
          date: "${date}"
          subject: "${subject}"
          url: "${url}"
          chromiumSource: {
            connect: {
              id: "${sourceId}"
            }
          }

        }
      ) {
        id
      }
    }
  `

  request(graphQlServer, createCommit)
    .then(data => {
      console.log(`New commit ${revision} created for repo ${sourceUrl}`)
    })
    .catch(err => {
      if (err.toString().includes('A unique constraint would be violated on Commit.')) {
        console.log(`${revision} already exists for repo ${sourceUrl}`);
      } else {
        console.log(err);
      }
    });
}

async function createOrUpdateGitPollers() {
  const query = `{
    chromiumSources {
      id
      url
      branch
      beginWith
    }
  }`
  const data = await request(graphQlServer, query);
  for (let i = 0; i < data.chromiumSources.length; ++i) {
    const repoDir = path.join(pollersDir, data.chromiumSources[i].id);

    // TODO(halton): Validate remote/branch if local repo exists
    if (!fs.existsSync(repoDir)) {
      await gitP().clone(data.chromiumSources[i].url, repoDir);
    }

    // Watch remote git changes
    const gw = new GitWatcher();
    gw.watch({
      path: repoDir,
      poll: 5 * 60, // 5 mins
      remote: 'origin',
      branch: data.chromiumSources[i].branch,
      strict: true
    });

    gw.result$.subscribe((result) => {
      if (result.error) {
        gw.unwatch(result.config);
      } else {
        if (result.changed) {
          gitP(repoDir).show(['--format="%H%n%aN <%aE>%n%cI%n%s"', '--no-patch'])
            .then(content => {
              addCommitToChromiumSource(data.chromiumSources[i].id,
                                        data.chromiumSources[i].url,
                                        content)
            })
            .catch(err => console.log(err));
        } else {
          console.log(`No change at ${result.config.path}\n`);
        }
      }
    });
  }
}

createDirectoryIfNotExists(pollersDir);
createOrUpdateGitPollers();
