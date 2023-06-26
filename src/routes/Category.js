const express = require("express");
const router = express.Router();
const categoryController = require("../controller/Category");
const {protect, roleAdmin} = require("../middleware/auth")
const upload = require("../middleware/upload")
const {hitCacheCategoryDetail,clearCacheCategoryDetail} = require('../middleware/redis')

router
  .get("/" , categoryController.getAllCategory)
  .get("/search", categoryController.searchCategory)
  .get("/:id", hitCacheCategoryDetail, categoryController.getDetailCategory)
  .post("/", protect,roleAdmin,upload.single('image_category'), categoryController.createCategory)
  .put("/:id",protect, roleAdmin,upload.single('image_category'),clearCacheCategoryDetail, categoryController.updateCategory)
  .delete("/:id", protect,roleAdmin,clearCacheCategoryDetail, categoryController.deleteCategory);

module.exports = router;
