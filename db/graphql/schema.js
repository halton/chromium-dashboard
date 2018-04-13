const { buildbotSchema } = require('./db-schema');
const { makeExecutableSchema } = require('graphql-tools');

const createType = require('mongoose-schema-to-graphql');

const config = {
  name: 'buildbotType',
  description: 'Buildbot schema',
  class: 'GraphQLObjectType',
  schema: buildbotSchema,
  exclude: ['_id']
};

const aaa = createType(config);
console.log(aaa.toString());

// Some fake data
const bots = [
  {
    url: 'https://github.com/otcshare/chromium-src',
    commits:
    [
      {
        revision: '2c313f7',
        url: 'https://github.com/otcshare/chromium-src/commit/2c313f7',
        author: 'Halton Huo <halton.huo@intel.com>',
        date: 'Wed Apr 11 09:33:44 CST 2018',
        message: 'This is a fake commit',
        builds:
        [
          {
            name: 'Android Arm',
            succeed: true,
            date: 'Wed Apr 11 09:33:44 CST 2018',
            duration: '20 minutes',
            os: 'Android',
            cpu: 'arm',
            gnArgs: 'is_component_build=false is_debug=false',
            log: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/android_arm_SUCCEED/chromium_android_arm_2018-04-08.log',
            download: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/android_arm_SUCCEED/ChromePublic.apk',
          },
          {
            name: 'Android Arm64',
            succeed: true,
            date: 'Wed Apr 11 09:33:44 CST 2018',
            duration: '20 minutes',
            os: 'Android',
            cpu: 'arm64',
            gnArgs: 'is_component_build=false is_debug=false',
            log: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/android_arm64_SUCCEED/chromium_android_arm64_2018-04-08.log',
            download: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/android_arm64_SUCCEED/ChromePublic.apk',
          },
          {
            name: 'Android x64',
            succeed: true,
            date: 'Wed Apr 11 09:33:44 CST 2018',
            duration: '20 minutes',
            os: 'Android',
            cpu: 'x64',
            gnArgs: 'is_component_build=false is_debug=false',
            log: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/android_x64_SUCCEED/chromium_android_x64_2018-04-08.log',
            download: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/android_x64_SUCCEED/ChromePublic.apk',
          },
          {
            name: 'Linux x64',
            succeed: true,
            date: 'Wed Apr 11 09:33:44 CST 2018',
            duration: '20 minutes',
            os: 'Linux',
            cpu: 'x64',
            gnArgs: 'is_component_build=false is_debug=false',
            log: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/linux_x64_SUCCEED/chromium_linux_x64_2018-04-09.log',
            download: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/linux_x64_SUCCEED/chromium-browser-unstable_65.0.3324.0-1_amd64.deb',
          },
          {
            name: 'Mac x64',
            succeed: false,
            date: 'Wed Apr 11 09:33:44 CST 2018',
            duration: '20 minutes',
            os: 'Mac',
            cpu: 'x64',
            gnArgs: 'is_component_build=false is_debug=false',
            log: 'http://archive.somewhere.com/public/webml/nightly/2c313f7/mac_x64_FAILED/chromium_mac_x64_2018-04-09.log',
            download: null,
          },
          {
            name: 'Win x64',
            succeed: false,
            date: null,
            duration: null,
            os: 'Mac',
            cpu: 'x64',
            gnArgs: 'is_component_build=false is_debug=false',
            log: null,
            download: null,
          },
        ],
      },
    ],
  },
  {
    url: 'https://github.com/halton/chromium-src',
  }
];


const typeDefs = `
  type Query {
    buildbots: [Buildbot]
  }
  type Buildbot @cacheControl(maxAge: 60) {
    url: String
    commits: [Commit]
  }
  type Commit @cacheControl(maxAge: 60) {
    revision: String
    url: String
    author: String
    date: String
    message: String
    builds: [Build]
  }
  type Build @cacheControl(maxAge: 60) {
    name: String
    succeed: Boolean
    date: String
    duration: String
    os: String
    cpu: String
    gnArgs: String
    log: String
    download: String
  }
`;


const resolvers = {
  Query: { buildbots: () => bots },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = { schema };
