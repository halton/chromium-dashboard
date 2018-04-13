const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const model = require('../../mongoose/buildbot');
const type = require('../types/buildbot').buildbotType;

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      buildbots: {
        type: new GraphQLList(type),
        resolve: function () {
          const buildbots = model.find().exec()
          if (!buildbots) {
            throw new Error('Error')
          }
          return buildbots
        }
      }
    }
  }
});
