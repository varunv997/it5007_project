const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language')
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/';

let db;

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
  },
});

const resolvers = {
  Query: {
    userGameList,
    user,
    allGames
  },
  Mutation: {
    createUser
  },
  GraphQLDate
};


async function allGames() {
  let games = await db.collection('games').find({}).toArray();
  return games;
}

async function userGameList(_, {id}) {
  let games = await db.collection('games').find({id:id}, {id:id}).toArray();
  return games;
}

async function user(_, {uid}) {
  let user = await db.collection('users').findOne({uid:uid}, {});
  return user;
}

async function createUser(_, { user }) {
  const result = await db.collection('users').insertOne(user);
  const savedUser = await db.collection('users')
    .findOne({ _id: result.insertedId }); 
  return savedUser;
}

const server = new ApolloServer ({
  typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});


async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

const app = express();

app.use(express.static('public'));
server.applyMiddleware({ app, path: '/graphql' });

(async function () {
  try {
    await connectToDb();
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();