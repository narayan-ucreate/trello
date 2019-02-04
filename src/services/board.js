const boardService = (
    { 
        registeredRepos : { 
            boardRepo: {
                 isBoardAlreadyExist,
                 createBoard,
                 boardInfo,
                 updateSyncColumn,
                 getBoards 
                }
            }, common : {
                acceptedTrelloEvent
             }
            }) => { 
    const createBoardIfNotExist = async ( inputs ) => {
        const { id, name } = inputs.model;
        const { translationKey } = inputs.action.display;
        const trelloEvent = acceptedTrelloEvent();
        const isAcceptedEvent = !! trelloEvent.find(event => event == translationKey);
        const boardInfo = await isBoardAlreadyExist(id);
        !!boardInfo === false && await createBoard({id , name });
        return { isAcceptedEvent , id, translationKey, boardInfo};
    }
    const getBoardInfo = async (boardId) => {

        return { boardInfo : await boardInfo(boardId) };
    }

    const getBoardsService = async () => {
        return getBoards();
    }

    const updateColumn = async (data, id) => {
            return await updateSyncColumn(data, id);
    }

    const createBoardIfNotExistApi = async ({id, name }) => {
        const boardInfo = await isBoardAlreadyExist(id);
        !!boardInfo === false && await createBoard({id , name });
        return !!boardInfo;
    }

    return { createBoardIfNotExist, getBoardInfo, updateColumn, getBoardsService, createBoardIfNotExistApi };
}
module.exports = { boardService };
