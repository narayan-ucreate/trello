const registerWebHooksRoutes = ({
  router,
  registeredServices : { 
    boardService : { 
      createBoardIfNotExist,
      getBoardInfo,
      updateColumn
    }, 
    cardService : { 
      createCardfNotExist, 
      attachMemberWithSpecificCard, 
      attachLabelWithSpecificCard 
    }, 
    labelService : { 
      createLabelfNotExist
     }, 
     trelloService : {
      createTrelloMemberIfNotExist, 
      createTrelloLabelIfNotExist,
      createTrelloListIfNotExist, 
      attachTrelloLabelToCard,
      attachTrelloMemberToCard,
      checkTrelloCheckList,
      moveTrelloCardToPreviousColumn,
      getTrelloCardDetails
    }, 
    memberService : {
      createMemberfNotExist
    }, 
    listService : { 
      createListifNotExist
    }, 
    cardMoveHistoryService : { 
      createCardMoveHistoryifNotExist
    }
  }
}) => {
  router.post('/get-hooks-information', async (req, res, next) => {
      const { id, isAcceptedEvent, translationKey } = await createBoardIfNotExist(req.body);
      const developmentDoneListId = '5c3343e7190d2f52a1867777'
      const { type } = req.body.action;
      if (isAcceptedEvent) {
          const cardAlreadyExist = await createCardfNotExist(req.body, id);
          !cardAlreadyExist  && await attachTrelloLabelToCard(req.body.action.data.card.id)
          !cardAlreadyExist &&  await attachTrelloMemberToCard(req.body.action.data.card.id)
          const { boardInfo } = await getBoardInfo(id);
          boardInfo && boardInfo.labelSync === false && await createTrelloLabelIfNotExist(id);  //import all labels for specific board if already not imported
          boardInfo && boardInfo.memberSync === false && await createTrelloMemberIfNotExist(id); //import all members for specific board if already not imported
          boardInfo && boardInfo.listSync === false && await createTrelloListIfNotExist(id);
          boardInfo && boardInfo.memberSync === false && await updateColumn({labelSync : true, listSync : true, memberSync : true }, id);
          (translationKey === 'action_added_member_to_card' || translationKey === 'action_member_joined_card') && await attachMemberWithSpecificCard(req.body);
          translationKey === 'action_added_member_to_board' &&  await createMemberfNotExist(req.body.action.member); //add member to our system if someone invite user from trello board.
           translationKey === 'action_added_list_to_board' && await createListifNotExist(req.body, id);
           if (translationKey === 'action_move_card_from_list_to_list') {
             const {
               id: cardId
             } = req.body.action.data.card;
             const {
               id: listId
             } = req.body.action.data.listBefore;
             const {
               id: listToId
             } = req.body.action.data.listAfter;
             const havePendingChecklist = await checkTrelloCheckList(cardId)
             if (havePendingChecklist && developmentDoneListId === listToId) {
               await moveTrelloCardToPreviousColumn(cardId, listId, 0);
             } else {
               await createCardMoveHistoryifNotExist(req.body)
             }
           }
           translationKey === 'action_create_card' && await createCardfNotExist(req.body, id);
      }
      const createLabel = (type === 'updateLabel' || type === 'createLabel' || translationKey === 'action_add_label_to_card');
      createLabel && await createLabelfNotExist(req.body);
      createLabel &&  await attachLabelWithSpecificCard(req.body);
      res.send('success');
  });
  router.get('/get-hooks-information', async (req, res, next) => {
   //await checkTrelloCheckList('5c51991ddda6f54c2c414d76')
   res.send('here');
   //5c51991ddda6f54c2c414d76
    //res.send(createCardMoveHistoryifNotExist('5c51991ddda6f54c2c414d76'));
  });
  
  router.get('/api/card-move-history', async (req, res, next) => {
    res.send('hi');
  });
  
  return router;
};
module.exports = {
  registerWebHooksRoutes,
};
