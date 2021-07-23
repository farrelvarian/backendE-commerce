const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");
const upload = require("../middlewares/multer");

router
    .get("/", productController.getAllProduct)
    .get("/:id", productController.getProduct)
    .get("/category/:category_id", productController.getProductByCategory)
    .post("/", upload.single("image"), productController.insertProduct)
    .put("/:id", upload.single("image"), productController.updateProduct)
    .delete("/:id", productController.deleteProduct);

module.exports = router;