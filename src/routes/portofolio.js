const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload')
const portofolioController = require('../controller/portofolio')

router
  .get("/", portofolioController.getAllPortofolio)
  .get("/:id", portofolioController.getDetailPortofolio)
  .post("/" , upload, portofolioController.createPortofolio)
  .put("/:id", upload, portofolioController.updatePortofolio)
  .delete("/:id", portofolioController.deletePortofolio)

module.exports = router;