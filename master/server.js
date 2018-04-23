'use strict';

const express = require("express");
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const mongoose = require('./config/mongoose');
const schema = require('./graphql/schema');

const PORT = process.env.PORT || 4000;

const db = mongoose();
const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress(schema));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
});
