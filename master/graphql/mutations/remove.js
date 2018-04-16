'use strict';

const { GraphQLString, GraphQLNonNull } = require('graphql');
const { BuildbotType } = require('../types/buildbot');
const { BuildbotModel } = require('../../models/buildbot');

exports.remove = {
  type: BuildbotType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removedbuildbot = BuildbotModel.findByIdAndRemove(params.id).exec();
    if (!removedbuildbot) {
      throw new Error('Error')
    }
    return removedbuildbot;
  }
}
