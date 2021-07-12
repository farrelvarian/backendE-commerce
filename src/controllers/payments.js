const paymentModel = require("../models/payments");
const helpers = require("../helpers/helpers");

const getAllPayment = (req, res, next) => {
    paymentModel
        .getAllPayment()
        .then((result) => {
            const payments = result;
            helpers.response(res, "Success get data", payments, 200);
        })
        .catch((error) => {
            console.log(error);
            helpers.response(res, "Not found payment", null, 404);
        });
};

const getPayment = (req, res, next) => {
    const id = req.params.id;
    paymentModel
        .getPayment(id)
        .then((result) => {
            const payments = result;
            helpers.response(res, "Success get data", payments, 200);
        })
        .catch((error) => {
            console.log(error);
            helpers.response(res, "Not found id payment", null, 404);
        });
};

const insertPayment = (req, res, next) => {
    const { user_id, order_id, payment_method } = req.body;
    const data = {
        user_id: user_id,
        order_id: order_id,
        payment_method: payment_method,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    paymentModel
        .insertPayment(data)
        .then(() => {
            helpers.response(res, "Success insert data", data, 200);
        })
        .catch((error) => {
            console.log(error);
            helpers.response(res, "Not found id payment", null, 404);
        });
};
const updatePayment = (req, res) => {
    const id = req.params.id;
    const { user_id, order_id, payment_method } = req.body;
    const data = {
        user_id: user_id,
        order_id: order_id,
        payment_method: payment_method,
        updatedAt: new Date(),
    };
    paymentModel
        .updatePayment(id, data)
        .then(() => {
            helpers.response(res, "Success update data", data, 200);
        })
        .catch((error) => {
            console.log(error);
            helpers.response(res, "Not found id payment", null, 404);
        });
};
const deletePayment = (req, res) => {
    const id = req.params.id;
    paymentModel
        .deletePayment(id)
        .then(() => {
            helpers.response(res, "Success delete data", id, 200);
        })
        .catch((err) => {
            console.log(err);
            helpers.response(res, "Not found id payment", null, 404);
        });
};

module.exports = {
    getAllPayment,
    getPayment,
    insertPayment,
    updatePayment,
    deletePayment,
};