const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('./mongoose/config/mongoose');
const { buildbotSchema } = require('./graphql/index');
// const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

// Initialize the app
// const db = mongoose();
const app = express();

app.use('/graphql', cors(), graphqlHTTP({
  schema: buildbotSchema,
  rootValue: global,
  graphiql: true
}));

// // The GraphQL endpoint
// app.use('/graphql', bodyParser.json(), graphqlExpress({ buildbotSchema }));

// // GraphiQL, a visual editor for queries
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
});
