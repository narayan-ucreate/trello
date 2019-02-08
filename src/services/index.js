let { boardService } = require('./board');
let { cardService } = require('./card');
let { labelService } = require('./label');
let { trelloService } = require('./trello');
let { memberService } = require('./member');
let { listService } = require('./list');
let { cardMoveHistoryService } = require('./card_move_history');
let { userAccessTokenervice } = require('./user_access_token');

//
const registerService = ({ registeredRepos, common }) => {
  boardService = boardService({ registeredRepos, common });
  cardService = cardService({ registeredRepos });
  labelService = labelService({ registeredRepos });
  trelloService = trelloService({ registeredRepos });
  memberService = memberService({ registeredRepos });
  listService = listService({ registeredRepos });
  cardMoveHistoryService = cardMoveHistoryService({ registeredRepos });
  userAccessTokenervice = userAccessTokenervice({ registeredRepos });
  return {
    boardService,
    cardService,
    labelService,
    trelloService,
    memberService,
    listService,
    cardMoveHistoryService,
    userAccessTokenervice,
  };
};
module.exports = { registerService };
