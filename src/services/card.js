const cardService = ({ registeredRepos : { cardRepo: { isCardAlreadyExist, createCard, attachMemberToCard, checkMemberAlreadyAttachedOrNot, checkLabelAlreadyAttachedOrNot, attachLabelToCard } }}) => { 
    const createCardfNotExist = async ( inputs, boardId ) => {
        const { id, name } = inputs.action.data.card;
        const response = !! await isCardAlreadyExist(id);
        !! response === false && await createCard({id , name, boardId });
        return response;
    }

    const attachMemberWithSpecificCard = async (inputs) => {
        const { id : cardId } = inputs.action.data.card;
        const { id : memberId } = inputs.action.data.member;
        !! await checkMemberAlreadyAttachedOrNot(memberId, cardId) === false && await attachMemberToCard({cardId , memberId})
        return true;
    }

    const attachLabelWithSpecificCard = async (inputs) => {
        const { id : cardId } = inputs.action.data.card;
        const { id : labelId } = inputs.action.data.label;
        !! await checkLabelAlreadyAttachedOrNot(cardId, labelId) === false && await attachLabelToCard({cardId , labelId})
        return true;
    }
    return { createCardfNotExist, attachMemberWithSpecificCard, attachLabelWithSpecificCard };
}
module.exports = { cardService };
