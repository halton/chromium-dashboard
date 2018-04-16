'use strict';

const { GraphQLString, GraphQLNonNull } = require('graphql');
const { BuildbotType } = require('../types/buildbot');
const { BuildbotModel } = require('../../models/buildbot');

exports.add = {
  type: BuildbotType,
  args: {
    url: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    const model = new BuildbotModel(params);
    const newBuildbot = model.save();
    if (!newBuildbot) {
      throw new Error('Error');
    }
    return newBuildbot
  }
}