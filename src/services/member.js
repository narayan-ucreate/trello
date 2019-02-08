const memberService = ({
  registeredRepos: {
    memberRepo: { isMemberAlreadyExist, createMember },
  },
}) => {
  const createMemberfNotExist = async (inputs) => {
    const { id, fullName: name } = inputs;
    !!(await isMemberAlreadyExist(id)) === false
      && (await createMember({ id, name }));
    return true;
  };
  return { createMemberfNotExist };
};
module.exports = { memberService };
