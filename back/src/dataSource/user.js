const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');
const bcrypt = require('bcrypt');

const {
  messages: {
    invalidAuthMessage,
    notExistingUserMessage,
    invalidEmailMessage,
    alreadyExistingUserMessage,
    incorrectPasswordMessage,
  },
} = require('../constants');
const { createJWTToken, encryptPassword } = require('../utils');

class UserAPI extends DataSource {
  constructor({ db }) {
    super();
    this.db = db;
    this.users = db.collection('users');
  }

  initialize(config) {
    this.context = config.context;
  }

  async signupUser({ email, password, name }) {
    try {
      if (!isEmail.validate(email)) throw new Error(invalidEmailMessage);

      const isExist = await this.users.findOne({ email });

      if (isExist) throw new Error(alreadyExistingUserMessage);

      await this.users.insertOne({
        email,
        password: encryptPassword(password),
        name,
      });

      const user = await this.users.findOne({ email });

      return {
        success: true,
        token: createJWTToken(user),
      };
    } catch (error) {
      return error;
    }
  }

  async loginUser({ email, password }) {
    try {
      const user = await this.users.findOne({ email });

      if (!user) throw new Error(notExistingUserMessage);

      const candidateValid = bcrypt.compareSync(password, user.password);

      if (!candidateValid) throw new Error(incorrectPasswordMessage);

      return {
        success: true,
        token: createJWTToken(user),
      };
    } catch (error) {
      return error;
    }
  }

  async updateUser(data) {
    try {
      const { user } = this.context;

      if (!user) throw new Error(invalidAuthMessage);

      const { _id } = user;

      await this.users.update(
        { _id },
        { $set: { ...data, password: encryptPassword(data.password) } },
      );

      const updatedUser = await this.users.findOne({ _id });

      return {
        success: true,
        token: createJWTToken(updatedUser),
      };
    } catch (error) {
      return error;
    }
  }

  async getMe() {
    try {
      const { user } = this.context;

      if (!user) throw new Error(invalidAuthMessage);

      const me = await this.users.findOne({ email: user.email });

      return me;
    } catch (error) {
      return error;
    }
  }

  async getAllUsers() {
    try {
      const { user } = this.context;

      if (!user) throw new Error(invalidAuthMessage);

      const users = await this.users.find().toArray();

      return users;
    } catch (error) {
      return error;
    }
  }

  async removeAllUsers() {
    try {
      const { user } = this.context;

      if (!user) throw new Error(invalidAuthMessage);

      await this.users.deleteMany({});

      return {
        success: true,
      };
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserAPI;
