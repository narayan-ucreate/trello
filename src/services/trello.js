const axios = require('axios');
const { trelloApiKey } = require('./../config');

const trelloService = ({
  registeredRepos: {
    memberRepo: { isMemberAlreadyExist, createMember },
    labelRepo: { isLabelAlreadyExist, createLabel },
    listRepo: { isListAlreadyExist, createList },
    cardRepo: {
      checkLabelAlreadyAttachedOrNot,
      attachLabelToCard,
      checkMemberAlreadyAttachedOrNot,
      attachMemberToCard,
    },
  },
}) => {
  const createTrelloMemberIfNotExist = async (boardId, trelloToken) => {
    const url = `https://api.trello.com/1/boards/${boardId}/members?key=${trelloApiKey}&token=${trelloToken}`;
    const { data } = await axios.get(url);
    data.map(async (member) => {
      !!(await isMemberAlreadyExist(member.id)) === false
        && (await createMember({
          id: member.id,
          name: member.fullName,
        }));
    });
    return true;
  };
  const createTrelloLabelIfNotExist = async (boardId, trelloToken) => {
    const url = `https://api.trello.com/1/boards/${boardId}/labels?fields=all&key=${trelloApiKey}&token=${trelloToken}`;
    const { data } = await axios.get(url);
    console.log(data);
    data.map(async (label) => {
      label.name !== ''
        && !!(await isLabelAlreadyExist(label.id)) === false
        && (await createLabel({
          id: label.id,
          name: label.name,
        }));
    });
    return true;
  };

  const createTrelloListIfNotExist = async (boardId, trelloToken) => {
    const url = `https://api.trello.com/1/boards/${boardId}/lists?fields=id,idBoard,name&key=${trelloApiKey}&token=${trelloToken}`;
    const { data } = await axios.get(url);
    data.map(async (list) => {
      !!(await isListAlreadyExist(list.id, list.idBoard)) === false
        && (await createList({
          id: list.id,
          name: list.name,
          boardId: list.idBoard,
        }));
    });
    return true;
  };

  const attachTrelloLabelToCard = async (cardId, trelloToken) => {
    const url = `https://api.trello.com/1/cards/${cardId}/labels?fields=id,name&key=${trelloApiKey}&token=${trelloToken}`;
    const { data } = await axios.get(url);
    data.map(async (label) => {
      !!(await checkLabelAlreadyAttachedOrNot(cardId, label.id)) === false
        && (await attachLabelToCard({
          cardId,
          labelId: label.id,
        }));
    });
    return true;
  };

  const attachTrelloMemberToCard = async (cardId, trelloToken) => {
    const url = `https://api.trello.com/1/cards/${cardId}/members?fields=id,name&key=${trelloApiKey}&token=${trelloToken}`;
    const { data } = await axios.get(url);
    data.map(async (member) => {
      !!(await checkMemberAlreadyAttachedOrNot(cardId, member.id)) === false
        && (await attachMemberToCard({
          cardId,
          memberId: member.id,
        }));
    });
    return true;
  };

  const checkTrelloCheckList = async (cardId, trelloToken) => {
    const url = `https://api.trello.com/1/cards/${cardId}/checklists?fields=all&key=${trelloApiKey}&token=${trelloToken}`;
    const { data } = await axios.get(url);
    let found = false;
    data.map(async (checklist) => {
      if (!found) {
        found = checklist.checkItems.find(item => item.state === 'incomplete');
        found = !!found;
      }
    });
    return found;
  };

  const moveTrelloCardToPreviousColumn = async (cardId, idList, postion, trelloToken) => {
    const url = `https://api.trello.com/1/cards/${cardId}?idList=${idList}&pos=${postion}&key=${trelloApiKey}&token=${trelloToken}`;
    await axios.put(url);
  };

  const getTrelloCardDetails = async (cardId, trelloToken) => {
    const url = `https://api.trello.com/1/cards/${cardId}?key=${trelloApiKey}&token=${trelloToken}`;
    const { data } = await axios.get(url);
    return data;
  };

  const getTrelloBoardDetails = async (boardId, trelloToken) => {
    const url = `https://api.trello.com/1/boards/${boardId}?key=${trelloApiKey}&token=${trelloToken}`;
    const { data } = await axios.get(url);
    return data;
  };

  const updateTrelloBoardWebHooks = async (input, trelloToken) => {
    const url = `https://api.trello.com/1/tokens/${trelloToken}/webhooks/?key=${trelloApiKey}`;
    const { data } = await axios.post(url, input);
    return data;
  };

  return {
    createTrelloMemberIfNotExist,
    createTrelloLabelIfNotExist,
    createTrelloListIfNotExist,
    attachTrelloLabelToCard,
    attachTrelloMemberToCard,
    checkTrelloCheckList,
    moveTrelloCardToPreviousColumn,
    getTrelloCardDetails,
    getTrelloBoardDetails,
    updateTrelloBoardWebHooks,
  };
};
module.exports = {
  trelloService,
};
