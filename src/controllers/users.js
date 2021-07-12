const userModel = require("../models/users");
const helpers = require("../helpers/helpers");
const { v4: uuidv4 } = require("uuid");

const getAllUser = (req, res, next) => {
    userModel
        .getAllUser()
        .then((result) => {
            const users = result;
            helpers.response(res, "Success get data", users, 200);
        })
        .catch((error) => {
            console.log(error);
            helpers.response(res, "Not found user", null, 404);
        });
};

const getUser = (req, res, next) => {
    const id = req.params.id;
    userModel
        .getUser(id)
        .then((result) => {
            const users = result;
            helpers.response(res, "Success get data", users, 200);
        })
        .catch((error) => {
            console.log(error);
            const err = new createError.InternalServerError();
            next(err);
        });
};

const insertUser = (req, res, next) => {
    const { name, email, password, phone, gender, dateOfBirth, address } =
    req.body;
    const data = {
        id: uuidv4(),
        name: name,
        email: email,
        password: password,
        phone: phone,
        gender: gender,
        dateOfBirth: dateOfBirth,
        address: address,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    userModel
        .insertUser(data)
        .then(() => {
            helpers.response(res, "Success insert data", data, 200);
        })
        .catch((error) => {
            console.log(error);
            helpers.response(res, "Not found id user", null, 404);
        });
};

const updateUser = (req, res) => {
    const id = req.params.id;
    const { name, email, password, phone, gender, dateOfBirth, address } =
    req.body;
    const data = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        gender: gender,
        dateOfBirth: dateOfBirth,
        address: address,
        updatedAt: new Date(),
    };
    userModel
        .updateUser(id, data)
        .then(() => {
            helpers.response(res, "Success update data", data, 200);
        })
        .catch((error) => {
            console.log(error);
            helpers.response(res, "Not found id user", null, 404);
        });
};

const deleteUser = (req, res) => {
    const id = req.params.id;
    userModel
        .deleteUser(id)
        .then(() => {
            helpers.response(res, "Success delete data", id, 200);
        })
        .catch((err) => {
            console.log(err);
            helpers.response(res, "Not found id user", null, 404);
        });
};

module.exports = {
    getAllUser,
    getUser,
    insertUser,
    updateUser,
    deleteUser,
};