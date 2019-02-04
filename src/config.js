require('dotenv').config()
const environment = process.env.APP_ENV || 'developement'
const config = { 
    local: {
        port : process.env.PORT || 4000,
        trello_api_key : process.env.TRELLO_API_KEY,
        trello_token : process.env.TRELLO_TOKEN,
        environment
    },
    production: {
        port : process.env.PORT || 4000,
        trello_api_key : process.env.TRELLO_API_KEY,
        trello_token : process.env.TRELLO_TOKEN,
        environment
    }
};
module.exports = config[environment]