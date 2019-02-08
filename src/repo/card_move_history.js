const cardMoveHistoryRepo = ({
  sequelize: {
    CardMoveHistory, sequelize, Card, CardMember, Member,
  },
}) => {
  const createHistory = data => CardMoveHistory.create(data);
  const updateOccurance = ({ listFromId, listToId, cardId }, totalOccurance) => CardMoveHistory.update(
    { totalOccurance },
    { where: { listFromId, listToId, cardId } },
  );

  const getRecentMoveHistory = ({ cardId }) => CardMoveHistory.findOne({
    where: {
      cardId,
    },
    attributes: ['listFromId', 'ListToId'],
    order: [['createdAt', 'DESC']],
  });

  const getCardMoveHistory = async (
    listFromId,
    ListToId,
    startDate,
    endDate,
  ) => {
    const lastDate = new Date(endDate);
    lastDate.setHours(23, 59, 59, 999);
    const beginingDate = new Date(startDate);
    beginingDate.setHours(23, 59, 59, 999);
    const history = await CardMoveHistory.findAll({
      attributes: [
        'cardId',
        [
          sequelize.fn('COUNT', sequelize.col('CardMoveHistory.cardId')),
          'no_of_occurrence',
        ],
      ],
      raw: true,
      where: {
        listFromId,
        ListToId,
        createdAt: {
          $between: [beginingDate, lastDate],
        },
      },
      include: [
        {
          model: Card,
          attributes: ['name'],
        },
      ],
      group: ['Card.name', 'CardMoveHistory.cardId'],
    });
    const cardIds = history.map(card => card.cardId);
    const members = await Card.findAll({
      where: { id: cardIds },
      attributes: ['id'],
      include: [
        {
          model: CardMember,
          attributes: ['memberId'],
          include: [
            {
              model: Member,
              attributes: ['name'],
            },
          ],
        },
      ],
    });
    const results = history.map((card) => {
      const [cardMembers] = members
        .filter(member => card.cardId === member.id)
        .map(member => member.CardMembers);
      return {
        cardId: card.cardId,
        no_of_occurrence: card.no_of_occurrence,
        cardName: card['Card.name'],
        members: cardMembers,
      };
    });

    //     const members = await CardMember.findAll({ attributes: ['cardId'], where: { cardId: cardIds }, include : [
    //         {
    //             model: Member,
    //             attributes : ['name']
    //         }
    //     ],
    // })
    return results;
  };

  return {
    createHistory,
    getCardMoveHistory,
    getRecentMoveHistory,
    updateOccurance,
  };
};

module.exports = { cardMoveHistoryRepo };
