require('dotenv').config()
const environment = process.env.APP_ENV || 'developement'
const config = { 
    local: {
        port : process.env.PORT || 4000,
        trello_api_key : process.env.TRELLO_API_KEY,
        trello_token : process.env.TRELLO_TOKEN,
        environment,
        web_url:  process.env.WEB_URL
    },
    production: {
        port : process.env.PORT || 4000,
        trello_api_key : process.env.TRELLO_API_KEY,
        trello_token : process.env.TRELLO_TOKEN,
        environment,
        web_hooks_url:  process.env.WEB_HOOK_URL
    }
};
module.exports = config[environment]