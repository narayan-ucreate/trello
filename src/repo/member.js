const memberRepo = ({ sequelize: { Member } }) => {
  const isMemberAlreadyExist = id => Member.count({ where: { id } });
  const createMember = data => Member.create(data);

  return { isMemberAlreadyExist, createMember };
};

module.exports = { memberRepo };
