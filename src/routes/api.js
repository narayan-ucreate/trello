const registerApisRoutes = ({
    router,
    registeredServices : { cardMoveHistoryService : { serviceGetCardMoveHistory }}
  }) => {
   
    router.get('/card-move-history', async (req, res, next) => {
        res.send(await serviceGetCardMoveHistory(req.query))
      //res.send(req.query);
    });
    
    return router;
  };
  module.exports = {
    registerApisRoutes,
  };
  