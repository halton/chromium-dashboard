'use strict';

const addBuildbot = require('./add').add;
const removeBuildbot = require('./remove').remove;
const updateBuildbot = require('./update').update;

module.exports = {
  addBuildbot,
  removeBuildbot,
  updateBuildbot
}