module.exports = {
  signupUser: async (parent, args, { dataSources }) => {
    const { userAPI } = await dataSources;
    return userAPI.signupUser(args.data);
  },
  updateUser: async (parent, args, { dataSources }) => {
    const { userAPI } = await dataSources;
    return userAPI.updateUser(args.data);
  },
  removeAllUsers: async (parent, args, { dataSources }) => {
    const { userAPI } = await dataSources;
    return userAPI.removeAllUsers();
  },
};
