'use strict';

const fs = require('fs');
const gitP = require('simple-git/promise');
const path = require('path');
const { GitWatcher } = require('git-repo-watch');
const { request } = require('graphql-request');

const graphQlServer = 'http://localhost:4466/chromium-dashboard-master/dev';
const pollersDir = path.join(__dirname, '.git_pollers_cache');
const repoUpdateInterval = 5 ; // 5 minutes

function createDirectoryIfNotExists(dir) {
  if (fs.existsSync(dir)) return;

  fs.mkdirSync(dir);
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
      poll: repoUpdateInterval,
      remote: 'origin',
      branch: data.chromiumSources[i].branch,
      strict: true
    });

    gw.result$.subscribe((result) => {
      if (result.error) {
        gw.unwatch(result.config);
      } else {
        if (result.changed) {
          console.log(`New change at ${result.config.path}\n`);

          gitP(repoDir).show()
            .then(content => console.log(content))
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
