const listService = ({
  registeredRepos: {
    listRepo: { isListAlreadyExist, createList },
    listRepo: { getBoardList },
  },
}) => {
  const createListifNotExist = async (inputs, boardId) => {
    const { id, name } = inputs.action.data.list;
    !!(await isListAlreadyExist(id, boardId)) === false
      && (await createList({ id, name, boardId }));
    return true;
  };

  const getBoardListService = boardId => getBoardList(boardId);
  return { createListifNotExist, getBoardListService };
};
module.exports = { listService };
