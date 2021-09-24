const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const db = require("./queries");
const { Client } = require('pg');

const client = new Client({
    user: "abannow",
    host: "localhost",
    database: "graphql",
    password: "kyp29867",
    port: 5432,
});

client.connect();

const app = express();
const port = 5000;

app.use(express.json());

const QueryRoot = new graphql.GraphQLObjectType({
  name: "Query",
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => "Woof woof!",
    },
  }),
});

const schema = new graphql.GraphQLSchema({ query: QueryRoot });

app.use(
  "/api",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// app.use(express.urlencoded({
//     extended: true,
// }))

// app.get('/', (req, res) => {
//     res.json({ info: 'STUFF ABOUT DOGS' })
// })

// app.get('/dogs', db.getDogs)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
