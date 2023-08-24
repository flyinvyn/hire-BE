const express = require("express");
const router = express.Router();
const skillController = require('../controller/skils')
const upload = require('../middleware/upload')

router
  .get("/", skillController.getAllSkill)
  .get("/:id", skillController.getDetailSkill)
  .post("/",upload, skillController.createSkill)
  .put("/:id", skillController.updateSkill)
  .delete("/:id", skillController.deleteSkill)

module.exports = router;