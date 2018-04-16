'use strict';

const { GraphQLObjectType, GraphQLList } = require('graphql');
const { BuildbotType } = require('../types/buildbot');
const { BuildbotModel } = require('../../models/buildbot');

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      buildbots: {
        type: new GraphQLList(BuildbotType),
        resolve: function () {
          const buildbots = BuildbotModel.find().exec()
          if (!buildbots) {
            throw new Error('Error')
          }
          return buildbots
        }
      }
    }
  }
});

