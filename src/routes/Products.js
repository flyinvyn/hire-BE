const express = require("express");
const router = express.Router();
const productController = require("../controller/Products");
const {protect, roleAdmin} = require("../middleware/auth")
const upload = require("../middleware/upload")
const {hitCacheProductDetail,clearCacheProductDetail} = require('../middleware/redis')

router
  .get("/", productController.getAllProduct)
  .get("/search", productController.searchProduct)
  .get("/:id",hitCacheProductDetail, productController.getDetailProduct)
  .post("/",protect, roleAdmin, upload.single('image_product'), productController.createProduct)
  .put("/:id",protect, roleAdmin, clearCacheProductDetail, upload.single('image_product'), productController.updateProduct)
  .delete("/:id",protect, roleAdmin,clearCacheProductDetail, productController.deleteProduct);

module.exports = router;