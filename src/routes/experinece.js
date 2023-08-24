const express = require("express");
const router = express.Router();
const experienceController = require('../controller/experience')
const upload =require('../middleware/upload')

router
  .get("/", experienceController.getAllExperience)
  .get("/:id", experienceController.getDetailExperience)
  .post("/", experienceController.createExperience)
  .put("/:id", experienceController.updateExperience)
  .delete("/:id", experienceController.deleteExperience)

module.exports = router;