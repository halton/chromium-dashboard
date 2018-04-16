'use strict';

const { GraphQLString, GraphQLNonNull } = require('graphql');
const { BuildbotType } = require('../types/buildbot');
const { BuildbotModel } = require('../../models/buildbot');

exports.update = {
  type: BuildbotType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    url: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    return BuildbotModel.findByIdAndUpdate(
      params.id,
      { $set: { url: params.url } },
      { new: true }
    )
      .catch(err => new Error(err));
  }
}

