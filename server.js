const express = require('express');
const ngrok = require('ngrok');

const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const { acceptedTrelloEvent } = require('./src/utils/helpers');
const { registerRepo } = require('./src/repo/index');
const { registerService } = require('./src/services/index');

const common = { acceptedTrelloEvent };
const {
  port,
  environment,
} = require('./src/config');
const MemoryStore =session.MemoryStore;
console.log(`this is port${port}`);
const { createSequelize } = require('./src/sequelize/models/index');
const {
  createApp,
} = require('./src/app');

app.use(bodyParser.urlencoded({
  extended: true,
}));
const sequelize = createSequelize();
const registeredRepos = registerRepo({ sequelize });
const registeredServices = registerService({ registeredRepos, common });
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  store: new MemoryStore(),
  saveUninitialized: true,
}));

createApp({
  app,
  express,
  sequelize,
  registeredServices,
});


if (environment === 'local') {
  ngrok.authtoken('2ryj3WTudtXLAr4SCFova_6CLTxrSz9jbVyK6NVpiyo', (err, token) => {});
  ngrok.connect(port, (err, url) => {
    console.log('this');
    console.log(url);
  });
}


app.listen(port || 4000);
console.log(`application running on port this${port}`);
module.exports = app;
