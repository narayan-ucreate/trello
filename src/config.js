require('dotenv').config();

const environment = process.env.APP_ENV || 'developement';
const config = {
  local: {
    port: process.env.PORT || 4000,
    trelloApiKey: process.env.TRELLO_API_KEY,
    trelloToken: process.env.TRELLO_TOKEN,
    environment,
    web_url: process.env.WEB_URL,
    webHookUrl: process.env.WEB_HOOK_URL,
  },
  production: {
    port: process.env.PORT || 4000,
    trelloApiKey: process.env.TRELLO_API_KEY,
    trelloToken: process.env.TRELLO_TOKEN,
    environment,
    webHookUrl: process.env.WEB_HOOK_URL,
  },
};
module.exports = config[environment];
