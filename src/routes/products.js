const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");
const upload = require("../middlewares/multer");

router
    .get("/", productController.getAllProduct)
    .get("/:id", productController.getProduct)
    .get("/category/:category_id", productController.getProductByCategory)
    .post("/", upload.array("images", 5), productController.insertProduct)
    .put("/:id", upload.array("images", 5), productController.updateProduct)
    .delete("/:id", productController.deleteProduct);

module.exports = router;