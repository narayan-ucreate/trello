const userAccessTokenervice = ({
  registeredRepos: {
    userAccessTokenRepo: { isUserAlreadyExist, createAccessToken, updateToken },
  },
}) => {
  const createUpdateMemberToken = async (data) => {
    const { memberId } = data;
    const userExist = !!(await isUserAlreadyExist(memberId));
    userExist === false && (await createAccessToken(data));
    userExist === true && (await updateToken(data, memberId));
  };
  return {
    createUpdateMemberToken,
  };
};
module.exports = { userAccessTokenervice };
