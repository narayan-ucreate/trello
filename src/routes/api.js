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


    
    return router;
  };
  module.exports = {
    registerApisRoutes,
  };
  