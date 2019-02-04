let { boardRepo } = require('./board');
let { cardRepo } = require('./card');
let { labelRepo } = require('./label');
let { memberRepo } = require('./member');
let { listRepo } = require('./list');
let { cardMoveHistoryRepo } = require('./card_move_history')

const registerRepo = ({ sequelize }) => {
     boardRepo = boardRepo({ sequelize });
     cardRepo = cardRepo({ sequelize });
     labelRepo = labelRepo({ sequelize });
     memberRepo = memberRepo( { sequelize });
     listRepo = listRepo( { sequelize });
     cardMoveHistoryRepo = cardMoveHistoryRepo({ sequelize });
     return {
         boardRepo,
         cardRepo,
         labelRepo,
         memberRepo,
         listRepo,
         cardMoveHistoryRepo
     }
}

module.exports = { registerRepo };