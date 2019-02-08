const boardRepo = ({ sequelize: { Board } }) => {
  const isBoardAlreadyExist = id => Board.count({ where: { id } });
  const createBoard = data => Board.create(data);
  const boardInfo = id => Board.findOne({ where: { id } });

  const updateSyncColumn = (data, id) => Board.update(data, { where: { id } });

  const getBoards = () => Board.findAll();
  const getSpecificBoards = boardIds => Board.findAll({ where: { id: boardIds } });
  return {
    isBoardAlreadyExist,
    createBoard,
    boardInfo,
    updateSyncColumn,
    getBoards,
    getSpecificBoards,
  };
};

module.exports = { boardRepo };
