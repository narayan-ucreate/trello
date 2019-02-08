const userAccessTokenRepo = ({ sequelize: { UserAccessToken } }) => {
  const isUserAlreadyExist = memberId => UserAccessToken.count({ where: { memberId } });
  const createAccessToken = data => UserAccessToken.create(data);

  const updateToken = (data, memberId) => UserAccessToken.update(data, { where: { memberId } });

  return {
    isUserAlreadyExist,
    createAccessToken,
    updateToken,
  };
};

module.exports = { userAccessTokenRepo };
