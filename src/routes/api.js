const registerApisRoutes = ({
    router,
    registeredServices : { 
      cardMoveHistoryService : { 
        serviceGetCardMoveHistory
      }, 
      boardService : { 
        getBoardsService,
        createBoardIfNotExistApi,
        updateColumn
      },
      trelloService : {
        getTrelloBoardDetails,
        createTrelloLabelIfNotExist,
        createTrelloListIfNotExist, 
        createTrelloMemberIfNotExist,
        updateTrelloBoardWebHooks
      },
      listService : {
        getBoardListService
      }
    }
  }) => {
   const { web_hooks_url } = require('./../config');

    router.get('/card-move-history', async (req, res, next) => {
        res.send(await serviceGetCardMoveHistory(req.query))
    });
    router.get('/boards', async (req, res, next) => {
      res.send(await getBoardsService());
    });
    router.post('/setup-board', async (req, res, next) => {
      const { board_url } = req.body;
      const explodeInfo = board_url.split('/');
      const boardId = explodeInfo[explodeInfo.length - 2];
      const { id, name } = boardId && await getTrelloBoardDetails(boardId);
      id 
        && await createBoardIfNotExistApi({ id, name }) === false 
        && await createTrelloLabelIfNotExist(id)
        && await createTrelloListIfNotExist(id)
        && await createTrelloMemberIfNotExist(id)
        && await updateColumn({labelSync : true, listSync : true, memberSync : true }, id)
        && updateTrelloBoardWebHooks({
          "description" : "",
          "callbackURL" : web_hooks_url,
          "idModel" : id
        })
      res.send('succces');
    });
    router.get('/get-columns/:boardId', async (req, res, next) => {
      res.send(await getBoardListService(req.params.boardId));
    });
    router.get('/card-move-history-report', async (req, res, next) => {
      req.query.startDate = req.query.startDate || new Date();
      req.query.endDate = req.query.endDate || new Date();
      
      res.send(await serviceGetCardMoveHistory(req.query));
    });



    
    return router;
  };
  module.exports = {
    registerApisRoutes,
  };
  