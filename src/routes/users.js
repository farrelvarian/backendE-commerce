const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router
    .get("/", userController.getAllUser)
    .get("/:id", userController.getUser)
    .post("/", userController.insertUser)
    .put("/:id", userController.updateUser)
    .delete("/:id", userController.deleteUser);

module.exports = router;