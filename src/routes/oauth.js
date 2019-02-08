const { OAuth } = require('oauth');
const url = require('url');
require('dotenv').config();

const registerOauthRoutes = ({
  router,
  registeredServices: {
    userAccessTokenervice: { createUpdateMemberToken },
    boardService: { getSpecificBoardsService },
  },
}) => {
  const oauthSecrets = {};

  const requestURL = 'https://trello.com/1/OAuthGetRequestToken';
  const accessURL = 'https://trello.com/1/OAuthGetAccessToken';
  const authorizeURL = 'https://trello.com/1/OAuthAuthorizeToken';
  const appName = 'Trello OAuth Example';
  // Trello redirects the user here after authentication
  const loginCallback = process.env.BASE_URL+'/oauth/callback';

  // You should have {"token": "tokenSecret"} pairs in a real application
  // Storage should be more permanent (redis would be a good choice)

  const key = process.env.TRELLO_API_KEY;
  const secret = process.env.TRELLO_AUTH_SECRET;
  const oauth = new OAuth(
    requestURL,
    accessURL,
    key,
    secret,
    '1.0A',
    loginCallback,
    'HMAC-SHA1',
  );
  router.get('/set-session', async (req, res) => {
    req.session.views = req.session.views + 1;
    res.send('set');
  });

  router.get('/get-session', async (req, res) => {
    const views = req.session.views;
    console.log(views);
    res.send('here');
  });


  /* eslint no-unused-vars: [0, { "args": "all" }] */
  router.get('/callback', async (req, res) => {
    const { query } = url.parse(req.url, true);
    const token = query.oauth_token;
    const tokenSecret = oauthSecrets[token];
    const verifier = query.oauth_verifier;

    oauth.getOAuthAccessToken(
      token,
      tokenSecret,
      verifier,
      async (error, accessToken, accessTokenSecret, results) => {
        const userInformation = await new Promise((resolve, reject) => {
          oauth.getProtectedResource(
            'https://api.trello.com/1/members/me',
            'GET',
            accessToken,
            accessTokenSecret,
            async (error, data, response) => {
              resolve(data);
            },
          );
        });

        const { id: memberId } = JSON.parse(userInformation);
        createUpdateMemberToken({ memberId, accessToken, accessTokenSecret });
        req.session.accessToken = accessToken;
        req.session.accessTokenSecret = accessTokenSecret;
        req.session.memberId = memberId;
        res.writeHead(301,
          { Location: './../board-list.html' });
        res.end();
      },
    );
  });

  router.get('/get-boards', async (req, res) => {
    const boards = await new Promise((resolve, reject) => {
      oauth.getProtectedResource(
        'https://api.trello.com/1/members/my/boards',
        'GET',
        req.session.accessToken,
        req.session.accessTokenSecret,
        async (error, data, response) => {
          resolve(JSON.parse(data));
        },
      );
    });
    const finalBoards = boards.map((board) => {
      const isAdmin = !!board.memberships.find(
        member => member.memberType === 'admin' && member.idMember === req.session.memberId,
      );
      return {
        id: board.id,
        name: board.name,
        url: board.url,
        isAdmin,
      };
    });
    const updatedBoards = await getSpecificBoardsService(finalBoards.map(board => board.id));
    const syncBoards = finalBoards.map((board) => {
      const updatedBoardInfo = updatedBoards.find(updatedBoard => updatedBoard.id === board.id);
      const found = !!updatedBoardInfo;
      return {
        id: board.id,
        name: board.name,
        url: board.url,
        isAdmin: board.isAdmin,
        accessToken: found && updatedBoardInfo.accessToken,
        accessTokenSecret: found && updatedBoardInfo.accessTokenSecret || false,
      };
    });
    res.send(syncBoards);
  });
  router.get('/login', (req, res) => {
    oauth.getOAuthRequestToken((error, token, tokenSecret) => {
      oauthSecrets[token] = tokenSecret;
      res.redirect(`${authorizeURL}?oauth_token=${token}&name=${appName}`);
    });
  });
  return router;
};
module.exports = {
  registerOauthRoutes,
};
