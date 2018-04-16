'use strict';

const { BuildbotSchema } = require('../../models/buildbot');
const { GraphQLObjectType } = require('graphql');
const createType = require('mongoose-schema-to-graphql');

const config = {
  name: 'buildbot',
  description: 'Buildbot schema',
  class: 'GraphQLObjectType',
  schema: BuildbotSchema,
  exclude: ['__v']
};

exports.BuildbotType = createType(config);
