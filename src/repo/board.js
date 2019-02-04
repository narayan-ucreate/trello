const boardRepo = ({ sequelize : { Board } }) => {
    const isBoardAlreadyExist = (id) => {
        return Board.count({ where: { id } })
    }
    const createBoard = (data) => {
        return Board.create(data)
    }
    const boardInfo = (id) => {
        return Board.findOne({where : { id } });
    }

    const updateSyncColumn = (data, id) => {
        return Board.update(data, { where : { id } });
    }

    
    return { isBoardAlreadyExist, createBoard, boardInfo, updateSyncColumn }
}

module.exports = { boardRepo }