const mongoose = require('mongoose');
const { buildbotSchema } = require('../../mongoose/buildbot');
const { buildbotType } = require('../types/buildbot');
const { GraphQLObjectType, GraphQLList } = require('graphql');

// const schema = new buildbotSchema;
const model = mongoose.model('Buildbot', buildbotSchema);

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      buildbots: {
        type: new GraphQLList(buildbotType),
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
