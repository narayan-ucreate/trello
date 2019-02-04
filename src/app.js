const bodyParser = require("body-parser");
const {
    registerWebHooksRoutes
} = require('./routes/index');

const {
    registerApisRoutes
} = require('./routes/api');

const createApp = ({
    app,
    express,
    registeredServices
}) => {
    const registerRoutes = ({app, express, registeredServices}) => {
        let router = express.Router();
        app.use('/trello/', registerWebHooksRoutes({
            router,
            registeredServices
        }));
        app.use('/api/', registerApisRoutes({
            router,
            registeredServices
        }));

    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    registerRoutes({app, express, registeredServices});
}

module.exports = {
    createApp
};