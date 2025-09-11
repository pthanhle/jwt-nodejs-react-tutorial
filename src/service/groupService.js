import db from "../models/index"

const getGroups = async () => {
    try {
        let data = await db.Group.findAll({
            order: [['name', 'ASC']] // or 'DESC'
        });
        return {
            EM: 'get groups success',
            EC: 0,
            DT: data
        };
    } catch (error) {
        console.log(error)
        return {
            EM: 'error form service',
            EC: 1,
            DT: []
        };
    }
}

module.exports = {
    getGroups
}