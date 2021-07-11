const categoryModel = require("../models/categories");
const helpers = require("../helpers/helpers");

const getAllCategory = (req, res, next) => {
    let numRows;
    const numPerPage = parseInt(req.query.npp) || 1;
    const page = parseInt(req.query.page) || 0;
    let numPages;
    const skip = page * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
    const limit = skip + "," + numPerPage;
    categoryModel.paginationCategory(numPerPage, page).then((result) => {
        numRows = result[0].numRows;
        numPages = Math.ceil(numRows / numPerPage);
        console.log("number per pages:", numPerPage);
        console.log("number of pages:", numPages);
    });
    const field = req.query.field || "name";
    const sort = req.query.sort || "ASC";
    paramSearch = req.query.search || "";
    let search = `WHERE products.${field} LIKE '%${paramSearch}%'`;
    if (search != "WHERE products.name LIKE '%%'") {
        search = `WHERE products.${field} LIKE '%${paramSearch}%'`;
    } else {
        search = "";
    }
    console.log(search);
    categoryModel
        .getAllCategory(field, sort, limit, search)
        .then((result) => {
            const responsePayload = {
                result: result,
            };
            if (page < numPages) {
                responsePayload.pagination = {
                    current: page,
                    perPage: numPerPage,
                    previous: page > 0 ? page - 1 : undefined,
                    next: page < numPages - 1 ? page + 1 : undefined,
                    sortBy: field,
                    orderBy: sort,
                };
            } else {
                responsePayload.pagination = {
                    err: "queried page " +
                        page +
                        " is >= to maximum page number " +
                        numPages,
                };
            }
            helpers.response(res, responsePayload, 200);
        })
        .catch((error) => {
            console.log(error);
            helpers.response(res, null, 500, {
                message: "internal server error",
            });
        });
};

const getCategory = (req, res, next) => {
    const id = req.params.id;
    categoryModel
        .getCategory(id)
        .then((result) => {
            const categories = result;
            helpers.response(res, categories, 200);
        })
        .catch((error) => {
            console.log(error);
            helpers.response(res, null, 500, {
                message: "internal server error",
            });
        });
};

const insertCategory = (req, res, next) => {
    const { name } = req.body;
    const data = {
        name: name,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    categoryModel
        .insertCategory(data)
        .then(() => {
            helpers.response(res, data, 200);
        })
        .catch((error) => {
            console.log(error);
            helpers.response(res, null, 500, {
                message: "internal server error",
            });
        });
};

const updateCategory = (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const data = {
        name: name,
        updatedAt: new Date(),
    };
    categoryModel
        .updateCategory(id, data)
        .then(() => {
            helpers.response(res, data, 200);
        })
        .catch((error) => {
            console.log(error);
            helpers.response(res, null, 500, {
                message: "internal server error",
            });
        });
};

const deleteCategory = (req, res) => {
    const id = req.params.id;
    categoryModel
        .deleteCategory(id)
        .then(() => {
            helpers.response(res, data, 200);
        })
        .catch((err) => {
            console.log(err);
            helpers.response(res, null, 500, {
                message: "internal server error",
            });
        });
};

module.exports = {
    getAllCategory,
    getCategory,
    insertCategory,
    updateCategory,
    deleteCategory,
};