const cardMoveHistoryRepo = ({ sequelize : { CardMoveHistory, sequelize } }) => {
    const createHistory = (data) => {
        return CardMoveHistory.create(data)
    }

    const getRecentMoveHistory = ({ cardId }) => {
        return CardMoveHistory.findOne({ 
            where : { 
                cardId
            }, order: [['createdAt', 'DESC']]
    });
    }

    const getCardMoveHistory = (listFromId, ListToId, startDate, endDate ) => {
        const lastDate = new Date(endDate);
        lastDate.setHours(23,59,59,999);
        const beginingDate = new Date(startDate);
        beginingDate.setHours(23,59,59,999);
        return CardMoveHistory.findAll(
            { 
                where : { 
                    listFromId,
                    ListToId,
                    createdAt: {
                        $between: [
                            beginingDate,
                            lastDate
                        ]
                    } 
                },
                attributes: ['cardId', 'listFromId', 'ListToId', [sequelize.fn('COUNT', sequelize.col('cardId')), 'no_of_occurrence' ]],
                group: ['cardId', 'listFromId', 'ListToId']
            }
        );
    }
    
    return { createHistory, getCardMoveHistory, getRecentMoveHistory }
}

module.exports = { cardMoveHistoryRepo }