const connection = require("../configs/db");

const insertUser = (data) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO users SET ?", data, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};
const findUser = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM users where email = ?",
            email,
            (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
    });
};
const activationUser = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE users SET status = "ACTIVED" where email = "${email}"`,

            (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
    });
};

module.exports = {
    insertUser,
    findUser,
    activationUser,
};