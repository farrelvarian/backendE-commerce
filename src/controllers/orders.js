const orderModel = require('../models/orders')
const helpers = require('../helpers/helpers')

const getAllOrder = (req, res, next) => {
  orderModel
    .getAllOrder()
    .then((result) => {
      const orders = result
      helpers.response(res, 'Success get data', orders, 200)
    })
    .catch((error) => {
      console.log(error)
      helpers.response(res, 'Not found order', null, 404)
    })
}

const getOrder = (req, res, next) => {
  const id = req.params.id
  orderModel
    .getOrder(id)
    .then((result) => {
      const orders = result
      helpers.response(res, 'Success get data', orders, 200)
    })
    .catch((error) => {
      console.log(error)
      const err = new createError.InternalServerError()
      next(err)
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
      helpers.response(res, 'Success insert data', data, 200)
    })
    .catch((error) => {
      console.log(error)
      helpers.response(res, 'Not found id order', null, 404)
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
      helpers.response(res, 'Success update data', data, 200)
    })
    .catch((error) => {
      console.log(error)
      helpers.response(res, 'Not found id order', null, 404)
    })
}
const deleteOrder = (req, res) => {
  const id = req.params.id
  orderModel
    .deleteOrder(id)
    .then(() => {
      helpers.response(res, 'Success delete data', id, 200)
    })
    .catch((err) => {
      console.log(err)
      helpers.response(res, 'Not found id order', null, 404)
    })
}

module.exports = {
  getAllOrder,
  getOrder,
  insertOrder,
  updateOrder,
  deleteOrder
}
