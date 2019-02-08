const registerWebHooksRoutes = ({
  router,
  registeredServices: {
    boardService: { createBoardIfNotExist, getBoardInfo, updateColumn },
    cardService: {
      createCardfNotExist,
      attachMemberWithSpecificCard,
      attachLabelWithSpecificCard,
    },
    labelService: { createLabelfNotExist },
    trelloService: {
      createTrelloMemberIfNotExist,
      createTrelloLabelIfNotExist,
      createTrelloListIfNotExist,
      attachTrelloLabelToCard,
      attachTrelloMemberToCard,
      checkTrelloCheckList,
      moveTrelloCardToPreviousColumn,
    },
    memberService: { createMemberfNotExist },
    listService: { createListifNotExist },
    cardMoveHistoryService: { createCardMoveHistoryifNotExist },
  },
}) => {
  router.post('/get-hooks-information', async (req, res) => {
    const { id, isAcceptedEvent, translationKey } = await createBoardIfNotExist(
      req.body,
    );
    const developmentDoneListId = '5c3343e7190d2f52a1867777';
    const { type } = req.body.action;
    if (isAcceptedEvent) {
      const cardAlreadyExist = await createCardfNotExist(req.body, id);
      const { boardInfo } = await getBoardInfo(id);
      const trelloToken = boardInfo.accessToken;
      !cardAlreadyExist
        && (await attachTrelloLabelToCard(req.body.action.data.card.id, trelloToken));
      !cardAlreadyExist
        && (await attachTrelloMemberToCard(req.body.action.data.card.id, trelloToken));
      
      boardInfo
        && boardInfo.labelSync === false
        && (await createTrelloLabelIfNotExist(id, trelloToken)); // import all labels for specific board if already not imported
      boardInfo
        && boardInfo.memberSync === false
        && (await createTrelloMemberIfNotExist(id, trelloToken)); // import all members for specific board if already not imported
      boardInfo
        && boardInfo.listSync === false
        && (await createTrelloListIfNotExist(id, trelloToken));
      boardInfo
        && boardInfo.memberSync === false
        && (await updateColumn(
          { labelSync: true, listSync: true, memberSync: true },
          id,
        ));
      (translationKey === 'action_added_member_to_card'
        || translationKey === 'action_member_joined_card')
        && (await attachMemberWithSpecificCard(req.body));
      translationKey === 'action_added_member_to_board'
        && (await createMemberfNotExist(req.body.action.member)); // add member to our system if someone invite user from trello board.
      translationKey === 'action_added_list_to_board'
        && (await createListifNotExist(req.body, id));
      if (translationKey === 'action_move_card_from_list_to_list') {
        const { id: cardId } = req.body.action.data.card;
        const { id: listId } = req.body.action.data.listBefore;
        const { id: listToId } = req.body.action.data.listAfter;
        const havePendingChecklist = await checkTrelloCheckList(cardId, trelloToken);
        if (havePendingChecklist && developmentDoneListId === listToId) {
          await moveTrelloCardToPreviousColumn(cardId, listId, 0, trelloToken);
        } else {
          await createCardMoveHistoryifNotExist(req.body);
        }
      }
      translationKey === 'action_create_card'
        && (await createCardfNotExist(req.body, id));
    }
    const createLabel = type === 'updateLabel'
      || type === 'createLabel'
      || translationKey === 'action_add_label_to_card';
    createLabel && (await createLabelfNotExist(req.body));
    createLabel && (await attachLabelWithSpecificCard(req.body));
    res.send('success');
  });
  router.get('/get-hooks-information', async (req, res) => {
    res.send('here');
  });
  return router;
};
module.exports = {
  registerWebHooksRoutes,
};
