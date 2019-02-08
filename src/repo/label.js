const labelRepo = ({ sequelize: { Label } }) => {
  const isLabelAlreadyExist = id => Label.count({ where: { id } });
  const createLabel = data => Label.create(data);

  return { isLabelAlreadyExist, createLabel };
};

module.exports = { labelRepo };
