var axios = require("axios");
const {
    trello_api_key,
    trello_token
} = require('./../config')
const trelloService = ({
    registeredRepos: {
        memberRepo: {
            isMemberAlreadyExist,
            createMember
        },
        labelRepo: {
            isLabelAlreadyExist,
            createLabel
        },
        listRepo: {
            isListAlreadyExist,
            createList
        },
        cardRepo: {
            checkLabelAlreadyAttachedOrNot,
            attachLabelToCard,
            checkMemberAlreadyAttachedOrNot,
            attachMemberToCard
        }
    }
}) => {
    const createTrelloMemberIfNotExist = async (boardId) => {
        const url = 'https://api.trello.com/1/boards/' + boardId + '/members?key=' + trello_api_key + '&token=' + trello_token
        const {
            data
        } = await axios.get(url)
        data.map(async member => {
            !!await isMemberAlreadyExist(member.id) == false && await createMember({
                id: member.id,
                name: member.fullName
            })
        })
        return true;
    }
    const createTrelloLabelIfNotExist = async (boardId) => {
        const url = 'https://api.trello.com/1/boards/' + boardId + '/labels?fields=all&key=' + trello_api_key + '&token=' + trello_token
        const {
            data
        } = await axios.get(url)
        data.map(async label => {
            label.name !== '' && !!await isLabelAlreadyExist(label.id) == false && await createLabel({
                id: label.id,
                name: label.name
            })
        })
        return true;
    }

    const createTrelloListIfNotExist = async (boardId) => {
        const url = 'https://api.trello.com/1/boards/' + boardId + '/lists?fields=id,idBoard,name&key=' + trello_api_key + '&token=' + trello_token
        const {
            data
        } = await axios.get(url)
        data.map(async list => {
            !!await isListAlreadyExist(list.id, list.idBoard) == false && await createList({
                id: list.id,
                name: list.name,
                boardId: list.idBoard
            })
        })
        return true;
    }

    const attachTrelloLabelToCard = async (cardId) => {
        const url = 'https://api.trello.com/1/cards/' + cardId + '/labels?fields=id,name&key=' + trello_api_key + '&token=' + trello_token
        const {
            data
        } = await axios.get(url)
        data.map(async label => {
            !!await checkLabelAlreadyAttachedOrNot(cardId, label.id) == false && await attachLabelToCard({
                cardId,
                labelId: label.id
            })
        })
        return true;
    }


    const attachTrelloMemberToCard = async (cardId) => {
        const url = 'https://api.trello.com/1/cards/' + cardId + '/members?fields=id,name&key=' + trello_api_key + '&token=' + trello_token
        const {
            data
        } = await axios.get(url)
        data.map(async member => {
            !!await checkMemberAlreadyAttachedOrNot(cardId, member.id) == false && await attachMemberToCard({
                cardId,
                memberId: member.id
            })
        })
        return true;
    }

    const checkTrelloCheckList = async (cardId) => {
        const url = `https://api.trello.com/1/cards/${cardId}/checklists?fields=all&key=${trello_api_key}&token=${trello_token}`
        const {
            data
        } = await axios.get(url)
        let found = false;
        data.map(async checklist => {
            if (!found) {
                found = checklist.checkItems.find(item => { 
                    return item.state === 'incomplete'
                }
                );
                found = !! found;
            }
        })
        console.log('status '+found)
        return found;
    }

    const moveTrelloCardToPreviousColumn = async (cardId, idList, postion) => {
        const url = `https://api.trello.com/1/cards/${cardId}?idList=${idList}&pos=${postion}&key=${trello_api_key}&token=${trello_token}`
        const {
            data
        } = await axios.put(url)
        // https://api.trello.com/1/cards/mAD4ofPd?idList=5c3343da045c31529830d550&pos=589823&key=1185720a73f1ce20acf6d2b58d8187e9&token=214b64709607a5915854611da67de92ca5add4fcae051892ae24b896296cddaa

    }

    const getTrelloCardDetails = async (cardId) => {
        const url = `https://api.trello.com/1/cards/${cardId}?key=${trello_api_key}&token=${trello_token}`
        const {
            data
        } = await axios.get(url)
        return data;

    }





    return {
        createTrelloMemberIfNotExist,
        createTrelloLabelIfNotExist,
        createTrelloListIfNotExist,
        attachTrelloLabelToCard,
        attachTrelloMemberToCard,
        checkTrelloCheckList,
        moveTrelloCardToPreviousColumn,
        getTrelloCardDetails
    }
};
module.exports = {
    trelloService
}