const listRepo = ({ sequelize: { List } }) => {
  const isListAlreadyExist = (id, boardId) => List.count({ where: { id, boardId } });
  const createList = data => List.create(data);

  const getBoardList = boardId => List.findAll({ where: { boardId }, attributes: ['id', 'name'] });

  return { isListAlreadyExist, createList, getBoardList };
};

module.exports = { listRepo };
