# Chromium Continuous Build

This is a Node.js based project to setup a Chromium continuous build.

The main reason is the chromium build infra is no longer support fork and customize a buildbot, check [here](https://groups.google.com/a/chromium.org/forum/?utm_medium=email&utm_source=footer#!msg/infra-dev/be9lOJo1nY0/7DWppThRBQAJ) for details.

This project will be a low weight of CI system for give chromium git URL.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* [Node.js](https://nodejs.org/en/), we suggest to use use [NVM](https://github.com/creationix/nvm) for handy.
* [Docker CE](https://www.docker.com/community-edition) and do below configurations
 - [Manager docker for non-root user](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user)
 - [Use proxy](https://docs.docker.com/network/proxy/)
 - `docker login` (register on https://hub.docker.com if you do not have)
* [Docker Compose](https://docs.docker.com/compose/)(1.11 above)
* [Prisma](https://www.prisma.io/)
```
npm install -g prisma
```

### master Side
3.  Start GraphQL server
```
cd master
prisma delpoy (long wait, it will pull docker images and config)
prisma playground
```

4. Test query

Use browser to visit http://localhost:3000/playground, paste below and Ctrl-Enter
```
query {
  chromiumSources {
    id
    url
    branch
    beginWith
  }
}
```

Or
```
 curl \
   -X POST \
   -H "Content-Type: application/json" \
   --data '{ "query": "query { chromiumSources { url branch beginWith } }" }' \
   http://localhost:4466/chromium-dashboard-master/dev

```

5. Test mutation
Use browser to visit http://localhost:3000/playground, paste below and Ctrl-Enter
```
mutation {
  createChromiumSource (
    data : {
      url: "https://github.com/otcshare/chromium-src"
      branch: "webml"
      beginWith: "ddccd3f6dba62870a038ecb7d68b28038fcbe5d9"
    }
  ) {
    id
    url
    branch
    beginWith
  }
}
```

Or
```
 curl \
   -X POST \
   -H "Content-Type: application/json" \
   --data '{ "query": "mutation { createChromiumSource(data: { url: \"https://github.com/otcshare/chromium-src\" }) { id } } " }' \
   http://localhost:4466/chromium-dashboard-master/dev

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
