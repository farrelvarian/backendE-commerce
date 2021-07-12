const productModel = require("../models/products");
const helpers = require("../helpers/helpers");

const getAllProduct = (req, res, next) => {
    var numRows;
    var numPerPage = parseInt(req.query.npp) || 5;
    var page = parseInt(req.query.page) || 0;
    var numPages;
    var skip = page * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
    var limit = skip + "," + numPerPage;
    productModel.paginationProduct(numPerPage, page).then((result) => {
        numRows = result[0].numRows;
        numPages = Math.ceil(numRows / numPerPage);
        console.log("number per pages:", numPerPage);
        console.log("number of pages:", numPages);
    });
    const field = req.query.field || "id";
    const sort = req.query.sort || "ASC";
    paramSearch = req.query.search || "";
    var search = `WHERE ${field} LIKE '%${paramSearch}%'`;
    if (search != `WHERE id LIKE '%%'`) {
        search = `WHERE ${field} LIKE '%${paramSearch}%'`;
    } else {
        search = "";
    }
    console.log(search);
    productModel
        .getAllProduct(field, sort, limit, search)
        .then((result) => {
            var responsePayload = {
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
            } else
                responsePayload.pagination = {
                    err: "queried page " +
                        page +
                        " is >= to maximum page number " +
                        numPages,
                };
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
            helpers.response(res, "Not found id product", null, 404);
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
        image: image,
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
        image: image,
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
    insertProduct,
    updateProduct,
    deleteProduct,
};