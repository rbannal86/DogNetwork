const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");
const { Client } = require('pg');
const joinMonster = require('join-monster');

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

const Dog = new graphql.GraphQLObjectType({
    name: 'Dog',
    extensions: {
        joinMonster: {
            sqlTable: 'dogs',
            uniqueKey: 'id'
        }
    },
    fields: () => ({
        id: { type: graphql.GraphQLInt },
        name: { type: graphql.GraphQLString },
    })
})

const QueryRoot = new graphql.GraphQLObjectType({
  name: "Query",
  fields: () => ({
    hello: {
      type: graphql.GraphQLString,
      resolve: () => "Woof woof!",
    },
    dogs: {
        type: new graphql.GraphQLList(Dog),
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return client.query(sql)
            })
        }
    },
    dog: {
        type: Dog,
        args: { 
          id: { type: graphql.GraphQLInt },
        },
        extensions: {
          joinMonster: {
            where: (dogsTable, args, context) => `${dogsTable}.id = ${args.id}`
          },
        },
        resolve: (parent, args, context, resolveInfo) => {
            return joinMonster.default(resolveInfo, {}, sql => {
                return client.query(sql)
            })
        }
    }
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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
