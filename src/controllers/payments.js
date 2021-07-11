const paymentModel = require('../models/payments')
const helpers = require('../helpers/helpers')

const getAllPayment = (req, res, next) => {
  paymentModel
    .getAllPayment()
    .then((result) => {
      const payments = result
      helpers.response(res, payments, 200)
    })
    .catch((error) => {
      console.log(error)
      helpers.response(res, null, 500, {
        message: 'internal server error'
      })
    })
}

const getPayment = (req, res, next) => {
  const id = req.params.id
  paymentModel
    .getPayment(id)
    .then((result) => {
      const payments = result
      helpers.response(res, payments, 200)
    })
    .catch((error) => {
      console.log(error)
      helpers.response(res, null, 500, {
        message: 'internal server error'
      })
    })
}

const insertPayment = (req, res, next) => {
  const { user_id, order_id, payment_method } = req.body
  const data = {
    user_id: user_id,
    order_id: order_id,
    payment_method: payment_method,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  paymentModel
    .insertPayment(data)
    .then(() => {
      helpers.response(res, data, 200)
    })
    .catch((error) => {
      console.log(error)
      helpers.response(res, null, 500, {
        message: 'internal server error'
      })
    })
}
const updatePayment = (req, res) => {
  const id = req.params.id
  const { user_id, order_id, payment_method } = req.body
  const data = {
    user_id: user_id,
    order_id: order_id,
    payment_method: payment_method,
    updatedAt: new Date()
  }
  paymentModel
    .updatePayment(id, data)
    .then(() => {
      helpers.response(res, data, 200)
    })
    .catch((error) => {
      console.log(error)
      helpers.response(res, null, 500, {
        message: 'internal server error'
      })
    })
}
const deletePayment = (req, res) => {
  const id = req.params.id
  paymentModel
    .deletePayment(id)
    .then(() => {
      helpers.response(res, data, 200)
    })
    .catch((err) => {
      console.log(err)
      helpers.response(res, null, 500, {
        message: 'internal server error'
      })
    })
}

module.exports = {
  getAllPayment,
  getPayment,
  insertPayment,
  updatePayment,
  deletePayment
}
