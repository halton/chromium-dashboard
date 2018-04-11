# Build Dashboard

This is a Node.js based project to setup a Chromium build dashboard for a Git project, it can shows each revision for different build configrations (OS, CPU, GN_Aargs, etc).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install [Node.js](https://nodejs.org/en/), we suggest to use use [NVM](https://github.com/creationix/nvm) for handy.

### DB server Side
1. Install MongoDB with instruction of https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
2. Start MongoDB server
```
cd db
mkdir data
mongod --dbpath=data
```
3. Start GraphQL server
```
cd db
npm install
npm run start
```

4. Test query
```
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
