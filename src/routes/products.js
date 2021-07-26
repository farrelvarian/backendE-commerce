const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");
const upload = require("../middlewares/multer");
const auth = require("../middlewares/auth");
const redisCache = require("../middlewares/redis");

router
    .get("/", redisCache.hitCacheAllProduct, productController.getAllProduct)
    .get(
        "/:id",
        auth.verifyAccess,
        redisCache.hitCacheProductId,
        productController.getProduct
    )
    .get(
        "/category/:category_id",
        redisCache.hitCacheProductCategory,
        productController.getProductByCategory
    )
    .post(
        "/",
        auth.verifyAccess,
        redisCache.clearRedisProduct,
        upload.array("images", 5),
        productController.insertProduct
    )
    .put(
        "/:id",
        auth.verifyAccess,
        redisCache.clearRedisProduct,
        upload.array("images", 5),
        productController.updateProduct
    )
    .delete("/:id", auth.verifyAccess, productController.deleteProduct);

module.exports = router;