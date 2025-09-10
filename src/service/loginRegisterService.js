import { where } from "sequelize/lib/sequelize"
import db from "../models/index"
import bcrypt from 'bcryptjs';
import { hash } from "bcrypt";
import { Op } from "sequelize";

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })

    if (user) {
        return true;
    }

    return false;
}

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })

    if (user) {
        return true;
    }

    return false;
}

const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const registerNewUser = async (rawUserData) => {
    try {
        //check email is exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exist',
                EC: 1
            }
        }
        //check phonenumber is exist
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'The phone number is already exist',
                EC: 1
            }
        }
        //hash user password
        let hashPassword = hashUserPassword(rawUserData.password);

        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
        })

        return {
            EM: 'A user is created successfully!',
            EC: 0
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs in service...',
            EC: -2
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin },
                ]
            }
        })

        if (user) {
            console.log(">>found user with email/phone: ", rawData.valueLogin)
            //check password
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            if (isCorrectPassword) {
                return {
                    EM: 'OK',
                    EC: 0,
                    DT: ''
                }
            }
        }

        console.log(">>Input user with email/phone: ", rawData.valueLogin, "password: ", rawData.password)
        return {
            EM: 'Your email/phone or password is incorrect!',
            EC: 1,
            DT: ''

        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs in service...',
            EC: -2,
            DT: ''
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin
}