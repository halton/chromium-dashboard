'use strict';

const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { queryType } = require('./queries/buildbot');
const mutation = require('./mutations/index');

exports.buildbotSchema = new GraphQLSchema({
  query: queryType,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutation
  })
})

