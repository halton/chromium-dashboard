'use strict'

const { buildbotSchema } = require('../../mongoose/buildbot');
const createType = require('mongoose-schema-to-graphql');

const config = {
  name: 'buildbotType',
  description: 'Buildbot schema',
  class: 'GraphQLObjectType',
  schema: buildbotSchema,
  exclude: ['_id']
};

exports.buildbotType = createType(config);
