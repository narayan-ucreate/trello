const labelService = ({ registeredRepos : { labelRepo: { isLabelAlreadyExist, createLabel } }}) => { 
    const createLabelfNotExist = async ( inputs ) => {
        const { id, name } = inputs.action.data.label;
        !! await isLabelAlreadyExist(id) === false && await createLabel({id , name });
        return true;
    }
    return { createLabelfNotExist };
}
module.exports = { labelService };