const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const { createDB } = require('./utils');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const UserAPI = require('./dataSource/user');
const { jwtKey } = require('./config');
const {
  messages: { invalidAuthMessage },
  collections,
} = require('./constants');

const app = async () => {
  const db = await createDB();

  const dataSources = () => ({
    userAPI: new UserAPI({ db }),
  });

  const context = async ({ req }) => {
    const token = req?.headers?.authorization;

    if (!token) return { user: null };

    const decodedUser = jwt.verify(token, jwtKey);

    if (!decodedUser) return new Error(invalidAuthMessage);

    const user = await db
      .collection(collections.users)
      .findOne({ _id: ObjectId(decodedUser._id) });

    return { user };
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context,
    introspection: true,
    playground: true,
  });

  server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
};

app();
