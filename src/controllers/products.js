const productModel = require("../models/products");
const helpers = require("../helpers/helpers");
const fs = require("fs");
const path = require("path");
const createError = require("http-errors");
const { log } = require("console");

const getAllProduct = (req, res, next) => {
    let numRows;
    const numPerPage = parseInt(req.query.npp) || 15;
    const page = parseInt(req.query.page) || 1;
    let numPages;
    const skip = (page - 1) * numPerPage;
    const field = req.query.field || "name";
    const sort = req.query.sort || "ASC";
    const paramSearch = req.query.search || "";
    let search = `WHERE name LIKE '%${paramSearch}%'`;
    if (search != "WHERE name LIKE '%%'") {
        search = `WHERE name LIKE '%${paramSearch}%'`;
    } else {
        search = "";
    }
    let searchPage = search
        // Here we compute the LIMIT parameter for MySQL query
    const limit = skip + "," + numPerPage;
    productModel
        .paginationProduct(numPerPage, page, searchPage)
        .then((result) => {
            numRows = result[0].numRows;
            numPages = Math.ceil(numRows / numPerPage);
            console.log("number per pages:", numPerPage);
            console.log("number of pages:", numPages);
            console.log("total pages:", numRows);
        });

    productModel
        .getAllProduct(field, sort, limit, search)
        .then((result) => {
            const responsePayload = {
                result: result,
            };
            if (page <= numPages) {
                responsePayload.pagination = {
                    totalData: numRows,
                    current: page,
                    totalPages: numPages,
                    perPage: numPerPage,
                    previous: page > 1 ? page - 1 : undefined,
                    next: page < numPages ? page + 1 : undefined,
                    sortBy: field,
                    orderBy: sort,
                    search: search,
                };
            } else {
                responsePayload.pagination = {
                    err: "queried page " +
                        page +
                        " is >= to maximum page number " +
                        numPages,
                };
            }
            helpers.response(res, "Success get data", responsePayload, 200);
        })
        .catch((error) => {
            console.log(error);
            helpers.response(res, "Not found product", null, 404);
        });
};

const getProduct = (req, res, next) => {
    const id = req.params.id;
    productModel
        .getProduct(id)
        .then((result) => {
            const products = result;
            helpers.response(res, "Success get data", products, 200);
        })
        .catch((error) => {
            console.log(error);
            const err = new createError.InternalServerError();
            next(err);
        });
};

const getProductByCategory = (req, res, next) => {
    const category_id = req.params.category_id;
    const field = req.query.field || "name";
    const sort = req.query.sort || "ASC";
    productModel
        .getProductByCategory(category_id, field, sort)
        .then((result) => {
            const products = result;
            helpers.response(res, "Success get data", products, 200);
        })
        .catch((error) => {
            console.log(error);
            const err = new createError.InternalServerError();
            next(err);
        });
};

const insertProduct = (req, res, next) => {
    const { name, brand, price, description, category_id, category, image } =
    req.body;
    const data = {
        name: name,
        brand: brand,
        price: price,
        description: description,
        category_id: category_id,
        category: category,
        image: `${process.env.BASE_URL}/files/${req.file.filename}`,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    productModel
        .insertProduct(data)
        .then(() => {

            helpers.response(res, "Success insert data", data, 200);
        })
        .catch((error) => {

            console.log(error);
            helpers.response(res, "Not found id product", null, 404);
        });
};
const updateProduct = (req, res) => {
    const id = req.params.id;
    const { name, brand, price, description, category_id, category, image } =
    req.body;
    const data = {
        name: name,
        brand: brand,
        price: price,
        description: description,
        category_id: category_id,
        category: category,
        image: `${process.env.BASE_URL}/file/${req.file.filename}`,
        updatedAt: new Date(),
    };
    productModel
        .updateProduct(id, data)
        .then(() => {
            helpers.response(res, "Success update data", data, 200);
        })
        .catch((error) => {
            console.log(error);
            helpers.response(res, "Not found id product", null, 404);
        });
};
const deleteProduct = (req, res) => {
    const id = req.params.id;
    productModel
        .deleteProduct(id)
        .then(() => {
            helpers.response(res, "Success delete data", id, 200);
        })
        .catch((err) => {
            console.log(err);
            helpers.response(res, "Not found id product", null, 404);
        });
};

module.exports = {
    getAllProduct,
    getProduct,
    getProductByCategory,
    insertProduct,
    updateProduct,
    deleteProduct,
};