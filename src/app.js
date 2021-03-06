const bodyParser = require('body-parser');
const path = require('path');

const {
  registerWebHooksRoutes,
} = require('./routes/index');

const {
  registerOauthRoutes,
} = require('./routes/oauth');

const {
  registerApisRoutes,
} = require('./routes/api');

const createApp = ({
  app,
  express,
  registeredServices,
}) => {
  const registerRoutes = ({ app, express, registeredServices }) => {
    const router = express.Router();
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/views/login.html'));
    });
    app.use('/trello/', registerWebHooksRoutes({
      router,
      registeredServices,
    }));
    app.use('/oauth/', registerOauthRoutes({
      router,
      registeredServices,
    }));
    app.use((req, res, next) => {
      const authenticated = !!req.session.accessToken;
      console.log(authenticated);
      if (!authenticated) {
        res.writeHead(301,
        { Location: '/' });
        res.end();
      } else {
        next();
      }
    });
    app.use('/api/', registerApisRoutes({
      router,
      registeredServices,
    }));
    
    app.get('/index.html', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/views/index.html'));
    });
    app.get('/board-list.html', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/views/board-list.html'));
    });
    app.get('/:boardId/details.html', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/views/details.html'));
    });
  };
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
  registerRoutes({ app, express, registeredServices });
};

module.exports = {
  createApp,
};
