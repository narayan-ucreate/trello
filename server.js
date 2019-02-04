const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { acceptedTrelloEvent } = require('./src/utils/helpers')
const { registerRepo } = require('./src/repo/index')
const { registerService } = require('./src/services/index')
const common = { acceptedTrelloEvent };
const {
  port,
} = require('./src/config');
const { createSequelize } = require('./src/sequelize/models/index');
const {
  createApp,
} = require('./src/app');
app.use(bodyParser.urlencoded({
  extended: true,
}));
const sequelize = createSequelize();
const registeredRepos = registerRepo({ sequelize });
const registeredServices = registerService({ registeredRepos, common })
app.use(bodyParser.json());
app.use(express.static('public'));

createApp({
  app,
  express,
  sequelize,
  registeredServices
});





   console.log('here');
  const ngrok = require('ngrok');
  ngrok.authtoken('2ryj3WTudtXLAr4SCFova_6CLTxrSz9jbVyK6NVpiyo', function (err, token) {});
  ngrok.connect(port, function (err, url) {
    console.log('this')
    console.log(url);
  });

app.listen(port);
module.exports = app;
