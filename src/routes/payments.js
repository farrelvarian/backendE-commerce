const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/payments')

router
  .get('/', paymentController.getAllPayment)
  .get('/:id', paymentController.getPayment)
  .post('/', paymentController.insertPayment)
  .put('/:id', paymentController.updatePayment)
  .delete('/:id', paymentController.deletePayment)

module.exports = router
