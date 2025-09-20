import userApiService from '../service/userApiService'
import roleApiService from '../service/roleApiService'

const readFunc = async (req, res) => {
    try {
        let data = await roleApiService.getAllRoles()
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    }
    catch (error) {
        return res.status(500).json({
            EM: 'error form server', //error message
            EC: '1', //error code
            DT: '', //data
        })
    }
}

const createFunc = async (req, res) => {
    try {
        //valid
        let data = await roleApiService.createNewRoles(req.body)
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error form server', //error message
            EC: '1', //error code
            DT: '', //data
        })
    }
}

const updateFunc = async (req, res) => {
    try {
        //valid

        let data = await userApiService.updateUser(req.body)
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error form server', //error message
            EC: '1', //error code
            DT: '', //data
        })
    }
}

const deleteFunc = async (req, res) => {
    try {
        let data = await roleApiService.deleteRoles(req.body.id);
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error form server', //error message
            EC: '1', //error code
            DT: '', //data
        })
    }
}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc
}