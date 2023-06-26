const express = require("express");
const router = express.Router();
const transactionController = require("../controller/Transactionn");
const {protect, roleAdmin} = require("../middleware/auth")
const {hitCacheProductDetail,clearCacheProductDetail} = require('../middleware/redis')

router
  .get("/", transactionController.getAllTransaction)
  .get("/search", transactionController.searchTransaction)
  .get("/:id", hitCacheProductDetail,transactionController.getDetailTransaction)
  .post("/",protect,roleAdmin, transactionController.createTransaction)
  .put("/:id",clearCacheProductDetail,protect,roleAdmin, transactionController.updateTransaction)
  .delete("/:id",clearCacheProductDetail,protect,roleAdmin, transactionController.deleteTransaction);

module.exports = router;
