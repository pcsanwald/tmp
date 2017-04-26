const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');

const books = [
  { title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling" },
  { title: "Jurassic Park",
    author: "Michael Crichton" },
];

const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

const resolvers = {
  Query: { books: () => books },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const query = `{ books { title, author } }`;

const app = express();

const graphqlLogger = require('express-bunyan-logger')({
  name: 'graphql-logger',
  includesFn: (req, res) => {
    console.log('asdf');
    const includes = {};
    if (req.body) includes.req_body = JSON.stringify(req.body);
    if (req.query) includes.req_query = JSON.stringify(req.query);
    return includes;
  },
});

app.use(graphqlLogger);
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000);
