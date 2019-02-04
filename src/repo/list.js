const listRepo = ({ sequelize : { List } }) => {
    const isListAlreadyExist = (id, boardId) => {
        return List.count({ where: { id, boardId } })
    }
    const createList = (data) => {
        return List.create(data)
    }

    return { isListAlreadyExist, createList}
}

module.exports = { listRepo }