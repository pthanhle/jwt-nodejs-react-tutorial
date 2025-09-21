import { where } from "sequelize/lib/sequelize"
import db from "../models/index"
import { includes } from "lodash"

const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true,
        })

        const persists = roles.filter(({ url: url1 }) =>
            !currentRoles.some(({ url: url2 }) => url1 === url2))
        if (persists.length === 0) {
            return {
                EM: 'Nothing to create...',
                EC: 1,
                DT: []
            }
        }

        await db.Role.bulkCreate(persists)
        return {
            EM: `Create roles success: ${persists.length} roles...`,
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs with service',
            EC: 1,
            DT: []
        }
    }
}

const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll({
            order: [['id', 'DESC']]
        })
        return {
            EM: `Get all roles success`,
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs with service',
            EC: 1,
            DT: []
        }
    }
}

const deleteRoles = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: { id: id }
        })
        if (role) {
            await role.destroy();
        }
        return {
            EM: `Delete roles success`,
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs with service',
            EC: 1,
            DT: []
        }
    }
}

const getRoleByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: `Not found any roles`,
                EC: 0,
                DT: []
            }
        }

        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ["id", 'name', 'description'],
            include: {
                model: db.Role,
                attributes: ["id", 'url', 'description'],
                through: { attributes: [] }
            }
        })

        return {
            EM: `Get roles by group success`,
            EC: 0,
            DT: roles
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs with service',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    createNewRoles, getAllRoles, deleteRoles, getRoleByGroup
}