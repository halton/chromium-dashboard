'use strict';

const { BuildSchema, CommitSchema, BuildbotSchema } = require('../../models/buildbot');
const { GraphQLObjectType } = require('graphql');
const createType = require('mongoose-schema-to-graphql');

const buildConfig = {
  name: 'build',
  description: 'Build schema',
  class: 'GraphQLObjectType',
  schema: BuildSchema,
  exclude: ['__v']
};
exports.BuildType = createType(buildConfig);

const commitConfig = {
  name: 'commit',
  description: 'Commit schema',
  class: 'GraphQLObjectType',
  schema: CommitSchema,
  exclude: ['__v']
};
exports.CommitType = createType(commitConfig);

const buildbotConfig = {
  name: 'buildbot',
  description: 'Buildbot schema',
  class: 'GraphQLObjectType',
  schema: BuildbotSchema,
  exclude: ['__v']
};

exports.BuildbotType = createType(buildbotConfig);
