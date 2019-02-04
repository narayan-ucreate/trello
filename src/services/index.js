let { boardService } = require('./board');
let { cardService } = require('./card');
let { labelService } = require('./label');
let { trelloService } = require('./trello');
let { memberService } = require('./member');
let { listService } = require('./list');
let { cardMoveHistoryService } = require('./card_move_history');

const registerService = ({ registeredRepos, common }) => {
    boardService = boardService( { registeredRepos, common });
    cardService = cardService( { registeredRepos });
    labelService = labelService({ registeredRepos });
    trelloService = trelloService({ registeredRepos });
    memberService = memberService( { registeredRepos });
    listService = listService( { registeredRepos });
    cardMoveHistoryService = cardMoveHistoryService( { registeredRepos });
    

    return {
        boardService,
        cardService,
        labelService,
        trelloService,
        memberService,
        listService,
        cardMoveHistoryService
    }
}
module.exports = { registerService };