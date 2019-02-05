const listRepo = ({ sequelize : { List } }) => {
    const isListAlreadyExist = (id, boardId) => {
        return List.count({ where: { id, boardId } })
    }
    const createList = (data) => {
        return List.create(data)
    }

    const getBoardList = (boardId) => {
        return List.findAll({ where : { boardId }, attributes : ['id', 'name'] })
    }
    
    return { isListAlreadyExist, createList, getBoardList}
}

module.exports = { listRepo }