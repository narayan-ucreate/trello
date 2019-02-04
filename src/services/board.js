const boardService = ({ registeredRepos : { boardRepo: { isBoardAlreadyExist, createBoard, boardInfo, updateSyncColumn } }, common : { acceptedTrelloEvent }}) => { 
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

    const updateColumn = async (data, id) => {
            return await updateSyncColumn(data, id);
    }
    return { createBoardIfNotExist, getBoardInfo, updateColumn };
}
module.exports = { boardService };
