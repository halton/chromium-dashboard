'use strict';

const { GraphQLString, GraphQLNonNull } = require('graphql');
const { BuildType, CommitType, BuildbotType } = require('../types/buildbot');
const { BuildModel, CommitModel, BuildbotModel } = require('../../models/buildbot');

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

exports.addCommit = {
  type: CommitType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    revision: {
      type: new GraphQLNonNull(GraphQLString),
    },
    url: {
      type: new GraphQLNonNull(GraphQLString),
    },
    author: {
      type: new GraphQLNonNull(GraphQLString),
    },
    date: {
      type: new GraphQLNonNull(GraphQLString),
    },
    message: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    const model = new CommitModel(params.revision, params.url, params.author, params.date, params.message);
    const newBuildbot = model.save();
    if (!newBuildbot) {
      throw new Error('Error');
    }
    return newBuildbot

    return BuildbotModel.findByIdAndUpdate(
      params.id,
      { $set: { commits: params.url } },
      { new: true }
    )
      .catch(err => new Error(err));
  }
}
