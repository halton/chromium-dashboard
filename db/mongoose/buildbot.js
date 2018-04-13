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

const commitSchema = mongoose.Schema({
  revision: String,
  url: String,
  author: String,
  date: mongoose.Schema.Types.Date,
  message: String,
  builds: [buildSchema]
});

exports.buildbotSchema = mongoose.Schema({
  url: String,
  commits: [commitSchema]
});
