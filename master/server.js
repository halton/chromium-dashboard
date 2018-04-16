'use strict';

const express = require("express");
const mongoose = require('./config/mongoose');
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const db = mongoose();
const app = express();

const PORT = process.env.PORT || 4000;

app.use('*', cors());

const buildbotSchema = require('./graphql/index').buildbotSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: buildbotSchema,
  rootValue: global,
  graphiql: true
}));

// Up and Running at Port 4000
app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}/graphql to run queries!`);
});
