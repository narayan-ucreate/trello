const { webHookUrl } = require('./../config');

const registerApisRoutes = ({
  router,
  registeredServices: {
    cardMoveHistoryService: { serviceGetCardMoveHistory },
    boardService: { getBoardsService, createBoardIfNotExistApi, updateColumn,getBoardInfo },
    trelloService: {
      getTrelloBoardDetails,
      createTrelloLabelIfNotExist,
      createTrelloListIfNotExist,
      createTrelloMemberIfNotExist,
      updateTrelloBoardWebHooks,
    },
    listService: { getBoardListService },
  },
}) => {
  router.get('/card-move-history', async (req, res) => {
    res.send(await serviceGetCardMoveHistory(req.query));
  });
  router.get('/boards', async (req, res) => {
    res.send(await getBoardsService());
  });
  router.post('/setup-board', async (req, res) => {
    const { boardUrl } = req.body;
    const explodeInfo = boardUrl.split('/');
    const boardId = explodeInfo[explodeInfo.length - 2];
    const trelloToken = req.session.accessToken;
    const { id, name } = boardId && (await getTrelloBoardDetails(boardId, trelloToken));
    
    id
       && (await createBoardIfNotExistApi({ id, name })) === false
       && (await createTrelloLabelIfNotExist(id, trelloToken))
       && (await createTrelloListIfNotExist(id, trelloToken))
       && (await createTrelloMemberIfNotExist(id, trelloToken))
       && (await updateColumn(
        {
          labelSync: true, listSync: true, memberSync: true, accessToken: req.session.accessToken, accessTokenSecret: req.session.accessTokenSecret,
        },
        id,
      ))
      && updateTrelloBoardWebHooks({
        description: '',
        callbackURL: webHookUrl,
        idModel: id,
      }, trelloToken);
    res.send('succces');
  });
  router.get('/get-columns/:boardId', async (req, res) => {
    const { boardInfo } = await getBoardInfo(req.params.boardId);
    const lists = await getBoardListService(req.params.boardId);
    res.send({ boardInfo, lists });
  });
  router.post('/update-development-done-column/:boardId', async (req, res) => {
    const { developmentDoneListId } = req.query;
    await updateColumn({ developmentDoneListId }, req.params.boardId);
    res.send('success');
  });

  router.get('/card-move-history-report', async (req, res) => {
    req.query.startDate = req.query.startDate || new Date();
    req.query.endDate = req.query.endDate || new Date();

    res.send(await serviceGetCardMoveHistory(req.query));
  });

  return router;
};
module.exports = {
  registerApisRoutes,
};
