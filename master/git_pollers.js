'use strict';

const fs = require('fs');
const path = require('path');
const { request } = require('graphql-request');

const graphQlServer = 'http://localhost:4466/chromium-dashboard-master/dev';
const pollersDir = path.join(__dirname, '.git_pollers_cache');

function createDirectoryIfNotExists(dir) {
  if (fs.existsSync(dir)) return;

  fs.mkdirSync(dir);
}


async function querySources() {
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
    createOrUpdateGitPollerDir(
        data.chromiumSources[i].id,
        data.chromiumSources[i].url,
        data.chromiumSources[i].branch,
        data.chromiumSources[i].beginWith);
  }
}

function createOrUpdateGitPollerDir(id, url, branch, beginWith) {
  createDirectoryIfNotExists(path.join(pollersDir, id));
}

createDirectoryIfNotExists(pollersDir);
querySources();
