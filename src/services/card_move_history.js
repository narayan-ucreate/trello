const cardMoveHistoryService = ({ registeredRepos : { cardMoveHistoryRepo: { createHistory, getCardMoveHistory, getRecentMoveHistory } }}) => { 
    const createCardMoveHistoryifNotExist = async ( inputs ) => {
        const { action } = inputs
        const { data } = action;
        const response = await getRecentMoveHistory({cardId : data.card.id});
        ((!!response === true && data.listBefore.id === response.listFromId && data.listAfter.id === response.ListToId) === false) && 
          createHistory({cardId : data.card.id, listFromId : data.listBefore.id, ListToId : data.listAfter.id, memberId: action.memberCreator.id })
        ;
        return true;
    }

    

    const serviceGetCardMoveHistory = async ({ listFromId, ListToId, startDate, endDate}) => {
        return getCardMoveHistory(listFromId, ListToId, startDate, endDate);
    }
    return { createCardMoveHistoryifNotExist, serviceGetCardMoveHistory };
}
module.exports = { cardMoveHistoryService };
