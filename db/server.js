const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const mongoose = require('./config/mongoose');
const { schema } = require("./schema");

const PORT = process.env.PORT || 4000;

// Initialize the app
const db = mongoose();
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
});
