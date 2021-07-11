const orderModel = require('../models/orders')
const helpers = require('../helpers/helpers')

const getAllOrder = (req, res, next) => {
  orderModel
    .getAllOrder()
    .then((result) => {
      const orders = result
      helpers.response(res, orders, 200)
    })
    .catch((error) => {
      console.log(error)
      helpers.response(res, null, 500, {
        message: 'internal server error'
      })
    })
}

const getOrder = (req, res, next) => {
  const id = req.params.id
  orderModel
    .getOrder(id)
    .then((result) => {
      const orders = result
      helpers.response(res, orders, 200)
    })
    .catch((error) => {
      console.log(error)
      helpers.response(res, null, 500, {
        message: 'internal server error'
      })
    })
}

const insertOrder = (req, res, next) => {
  const { product_id, size, color, quantity } = req.body
  const data = {
    product_id: product_id,
    size: size,
    color: color,
    quantity: quantity,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  orderModel
    .insertOrder(data)
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
const updateOrder = (req, res) => {
  const id = req.params.id
  const { product_id, size, color, quantity } = req.body
  const data = {
    product_id: product_id,
    size: size,
    color: color,
    quantity: quantity,
    updatedAt: new Date()
  }
  orderModel
    .updateOrder(id, data)
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
const deleteOrder = (req, res) => {
  const id = req.params.id
  orderModel
    .deleteOrder(id)
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
  getAllOrder,
  getOrder,
  insertOrder,
  updateOrder,
  deleteOrder
}
