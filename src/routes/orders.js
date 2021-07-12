const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orders");

router
    .get("/", orderController.getAllOrder)
    .get("/:id", orderController.getOrder)
    .post("/", orderController.insertOrder)
    .put("/:id", orderController.updateOrder)
    .delete("/:id", orderController.deleteOrder);

module.exports = router;