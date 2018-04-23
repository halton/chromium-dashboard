'use strict';

const mongoose = require('mongoose');

const buildSchema = mongoose.Schema({
  name: String,
  succeed: Boolean,
  date: mongoose.Schema.Types.Date,
  duration: String,
  os: String,
  cpu: String,
  gnArgs: String,
  log: String,
  download: String
});
exports.BuildSchema = buildSchema;
exports.BuildModel = mongoose.model('Build', buildSchema);

const commitSchema = mongoose.Schema({
  revision: String,
  url: String,
  author: String,
  date: mongoose.Schema.Types.Date,
  message: String,
  builds: [buildSchema]
});

exports.CommitSchema = commitSchema;
exports.CommitModel = mongoose.model('Commit', commitSchema);

const buildbotSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  commits: [commitSchema]
});

exports.BuildbotSchema = buildbotSchema;
exports.BuildbotModel = mongoose.model('Buildbot', buildbotSchema);
