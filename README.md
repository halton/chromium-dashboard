# Chromium Continuous Build

This is a Node.js based project to setup a Chromium continuous build.

The main reason is the chromium build infra is no longer support fork and customize a buildbot, check [here](https://groups.google.com/a/chromium.org/forum/?utm_medium=email&utm_source=footer#!msg/infra-dev/be9lOJo1nY0/7DWppThRBQAJ) for details.

This project will be a low weight of CI system for give chromium git URL.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install [Node.js](https://nodejs.org/en/), we suggest to use use [NVM](https://github.com/creationix/nvm) for handy.

### master Side
1. Install MongoDB with instruction at https://docs.mongodb.com/manual/tutorial/
2. Start MongoDB server
```
cd master
mkdir data
mongod --dbpath=data
```
3. Start GraphQL server
```
cd master
npm install
npm run start
```

4. Test query
Use browser to visit http://localhost:4000/graphql or
```
 curl \
   -X POST \
   -H "Content-Type: application/json" \
   --data '{ "query": "query { buildbots }" }' \
   http://localhost:4000/graphql

```

### Dashboard Side
1. Start dashboard
```
cd dashboard
npm install
npm install --save @angular-devkit/core
./node_modules/.bin/ng serve
```

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details
