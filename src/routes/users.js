const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const auth = require("../middlewares/auth");

router
    .get("/", auth.verifyAccess, userController.getAllUser)
    .get("/:id", auth.verifyAccess, userController.getUser)
    .post("/", auth.verifyAccess, userController.insertUser)
    .put("/:id", auth.verifyAccess, userController.updateUser)
    .delete("/:id", auth.verifyAccess, userController.deleteUser);

module.exports = router