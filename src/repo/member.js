const memberRepo = ({ sequelize : { Member } }) => {
    const isMemberAlreadyExist = (id) => {
        return Member.count({ where: { id } })
    }
    const createMember = (data) => {
        return Member.create(data)
    }

    
    return { isMemberAlreadyExist, createMember }
}

module.exports = { memberRepo }