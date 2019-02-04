const labelRepo = ({ sequelize : { Label } }) => {
    const isLabelAlreadyExist = (id) => {
        return Label.count({ where: { id } })
    }
    const createLabel = (data) => {
        return Label.create(data)
    }
    
    
    return { isLabelAlreadyExist, createLabel }
}

module.exports = { labelRepo }