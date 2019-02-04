const cardRepo = ({ sequelize : { Card, CardMember, CardLabel } }) => {
    const isCardAlreadyExist = (id) => {
        return Card.count({ where: { id } })
    }
    const createCard = (data) => {
        data.cardCreatedDate = new Date(1000*parseInt(data.id.substring(0,8),16));
        return Card.create(data)
    }

    const attachMemberToCard = (data) => {
        return CardMember.create(data)
    }
    const checkMemberAlreadyAttachedOrNot = (memberId, cardId) => {
        return CardMember.count({ where : { memberId, cardId } })
    }
    
    const attachLabelToCard = (data) => {
        return CardLabel.create(data)
    }
    const checkLabelAlreadyAttachedOrNot = (cardId, labelId) => {
        return CardLabel.count({ where : { cardId, labelId } })
    }

    return { isCardAlreadyExist, createCard, attachMemberToCard, checkMemberAlreadyAttachedOrNot, attachLabelToCard, checkLabelAlreadyAttachedOrNot }
}

module.exports = { cardRepo }