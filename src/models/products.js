const connection = require("../configs/db");

const paginationProduct = (numPerPage, page, searchPage) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT count(*) as numRows FROM products ${searchPage} `,
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

const getAllProduct = (field, sort, limit, search) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM products ${search} ORDER BY ${field} ${sort} LIMIT ${limit} `,
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
const getAllProductForRedis = (field, sort, limit, search) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM products`,
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

const getProduct = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM products  WHERE id = ?",
            id,
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
const getImageProduct = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT image FROM products  WHERE id = ?",
            id,
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

const getProductByCategory = (category_id, field, sort) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM products  WHERE category_id = ? ORDER BY ${field} ${sort}`,
            category_id,
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

const insertProduct = (data) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO products SET ?", data, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const updateProduct = (id, data) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "UPDATE products SET ? WHERE id = ?", [data, id],
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

const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "DELETE FROM products WHERE id = ?",
            id,
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
    paginationProduct,
    getAllProduct,
    getAllProductForRedis,
    getProduct,
    getImageProduct,
    getProductByCategory,
    insertProduct,
    updateProduct,
    deleteProduct,
};