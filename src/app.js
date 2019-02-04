const bodyParser = require("body-parser");
const path = require('path');

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
        app.get("/index.html", function (req, res) {
           res.sendFile(path.join(__dirname, '../views/index.html'));
        });
        app.get('/:boardId/details.html', function (req, res) {
            const { boardId } = req.params;
            res.sendFile(path.join(__dirname, '../views/index.html'));
         });


       
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