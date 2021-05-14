const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { mongodbUrl, jwtKey } = require('./config');

const createDB = async () => {
  const client = new MongoClient(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  const db = await client.db('money-data');

  return db;
};

const createJWTToken = (user) => jwt.sign(user, jwtKey);

const encryptPassword = (password) => bcrypt.hashSync(password, 10);

module.exports = {
  createDB,
  createJWTToken,
  encryptPassword,
};
