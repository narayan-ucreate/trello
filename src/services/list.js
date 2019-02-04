const listService = ({ registeredRepos : { listRepo: { isListAlreadyExist, createList } }}) => { 
    const createListifNotExist = async ( inputs, boardId ) => {
        const { id, name } = inputs.action.data.list;
        !! await isListAlreadyExist(id, boardId) === false && await createList({id , name, boardId });
        return true;
    }
    return { createListifNotExist };
}
module.exports = { listService };
