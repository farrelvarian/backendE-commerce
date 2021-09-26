const paymentModel = require('../models/payments')
const helpers = require('../helpers/helpers')
const short = require("short-uuid");

const getAllPayment = (req, res, next) => {
    let numRows;
    const numPerPage = parseInt(req.query.npp) || 5;
    const page = parseInt(req.query.page) || 1;
    let numPages;
    const skip = (page - 1) * numPerPage;
    const field = req.query.field || "createdAt";
    const sort = req.query.sort || "DESC";
    
     paymentModel
       .paginationPayment(numPerPage, page)
       .then((result) => {
         numRows = result[0].numRows;
         numPages = Math.ceil(numRows / numPerPage);
         console.log("number per pages:", numPerPage);
         console.log("number of pages:", numPages);
         console.log("total pages:", numRows);
       });

    // Here we compute the LIMIT parameter for MySQL query
    const limit = skip + "," + numPerPage;
  paymentModel
    .getAllPayment(field, sort, limit)
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
         };
       } else {
         responsePayload.pagination = {
           err:
             "queried page " +
             page +
             " is >= to maximum page number " +
             numPages,
         };
       }
      helpers.response(res, "Success get data", responsePayload, 200);
    })
    .catch((error) => {
      console.log(error);
      helpers.response(res, "Not found payment", null, 404);
    });
}

const getPayment = (req, res, next) => {
  const id = req.params.id
   let numRows;
   const numPerPage = parseInt(req.query.npp) || 5;
   const page = parseInt(req.query.page) || 1;
   let numPages;
   const skip = (page - 1) * numPerPage;
   const field = req.query.field || "createdAt";
   const sort = req.query.sort || "DESC";
   paymentModel
     .paginationPayment(numPerPage, page,id)
     .then((result) => {
       numRows = result[0].numRows;
       numPages = Math.ceil(numRows / numPerPage);
       console.log("number per pages:", numPerPage);
       console.log("number of pages:", numPages);
       console.log("total pages:", numRows);
     });

   // Here we compute the LIMIT parameter for MySQL query
   const limit = skip + "," + numPerPage;
  paymentModel
    .getPayment(id, field, sort, limit)
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
        };
      } else {
        responsePayload.pagination = {
          err:
            "queried page " +
            page +
            " is >= to maximum page number " +
            numPages,
        };
      }
      helpers.response(res, "Success get data", responsePayload, 200);
    })
    .catch((error) => {
      console.log(error);
      helpers.response(res, "Not found payment", null, 404);
    });
}

const insertPayment = (req, res, next) => {
  const id = short.generate();
  const { user_id, payment_method,total } = req.body
  const data = {
    id: id,
    user_id: user_id,
    payment_method: payment_method,
    total:total,
    createdAt: new Date(),
  };

  paymentModel
    .insertPayment(data)
    .then(() => {
      helpers.response(res, 'Success insert data', data, 200)
    })
    .catch((error) => {
      console.log(error)
      helpers.response(res, 'Not found id payment', null, 404)
    })
}
const updatePayment = (req, res) => {
  const id = req.params.id
  const { user_id, order_id, payment_method, total } = req.body;
  const data = {
    user_id: user_id,
    order_id: order_id,
    payment_method: payment_method,
    total: total,
    updatedAt: new Date(),
  };
  paymentModel
    .updatePayment(id, data)
    .then(() => {
      helpers.response(res, 'Success update data', data, 200)
    })
    .catch((error) => {
      console.log(error)
      helpers.response(res, 'Not found id payment', null, 404)
    })
}
const deletePayment = (req, res) => {
  const id = req.params.id
  paymentModel
    .deletePayment(id)
    .then(() => {
      helpers.response(res, 'Success delete data', id, 200)
    })
    .catch((err) => {
      console.log(err)
      helpers.response(res, 'Not found id payment', null, 404)
    })
}

module.exports = {
  getAllPayment,
  getPayment,
  insertPayment,
  updatePayment,
  deletePayment
}
