module.exports = {
  loginUser: async (parent, args, { dataSources }) => {
    const { userAPI } = await dataSources;
    return userAPI.loginUser(args.data);
  },
  getMe: async (parent, args, { dataSources }) => {
    const { userAPI } = await dataSources;
    return userAPI.getMe();
  },
  getAllUsers: async (parent, args, { dataSources }) => {
    const { userAPI } = await dataSources;
    return userAPI.getAllUsers();
  },
};
