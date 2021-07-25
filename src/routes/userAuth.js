const express = require('express')
const router = express.Router()
const userController = require('../controllers/userAuth')

router
    .post('/register', userController.register)
    .post('/login', userController.login)

module.exports = router