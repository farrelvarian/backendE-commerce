const userModels = require("../models/userAuth");
const { v4: uuidv4 } = require("uuid");
const helpers = require("../helpers/helpers");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async(req, res, next) => {

    const { name, email, password, phone, gender, dateOfBirth, role, address } =
    req.body;

    const user = await userModels.findUser(email);
    if (user.length > 0) {
        return helpers.response(res, "email sudah ada", null, 401);
    }
    console.log(user);
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            console.log(hash);
            const data = {
                id: uuidv4(),
                name: name,
                email: email,
                password: hash,
                phone: phone,
                gender: gender,
                dateOfBirth: dateOfBirth,
                address: address,
                role: role,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            userModels
                .insertUser(data)
                .then((result) => {
                    delete data.password;
                    helpers.response(res, "Success register", data, 200);
                })
                .catch((error) => {
                    console.log(error);
                    helpers.response(res, "error register", null, 500);
                });
        });
    });
};

const login = async(req, res, next) => {
    const { email, password } = req.body;
    const result = await userModels.findUser(email);
    const user = result[0];
    const role = user.role
    let roleUser
    switch (role) {
        case "CUSTOMMER":
            roleUser = "1";
            break;
        case "SELLER":
            roleUser = "2";
            break;
        case "ADMIN":
            roleUser = "3";
    }

    bcrypt.compare(password, user.password, function(err, resCompare) {
        if (!resCompare) {
            return helpers.response(res, "password wrong", null, 401);
        }

        // generate token
        jwt.sign({ email: user.email, role: roleUser },
            process.env.SECRET_KEY, { expiresIn: "24h" },
            function(err, token) {
                console.log(token);
                console.log(process.env.SECRET_KEY);
                delete user.password;
                user.token = token;
                helpers.response(res, "success login",
                    user, 200);
            }
        );
    });
};
module.exports = {
    register,
    login,
};