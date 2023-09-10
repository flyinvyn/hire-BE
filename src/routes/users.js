const express = require("express");
const router = express.Router();
const uploadWorker = require("../middleware/uploadProfile");
const workerController = require("../controller/users");
router
  .post("/register", workerController.registerWorker)
  .post("/login", workerController.loginWorker)
  .get("/profile/:id", workerController.getSelectWorker)
  .get("/profile", workerController.getAllWorker)
  .get("/verify", workerController.VerifyAccount)
  .put("/profile/:id", workerController.updateWorker)
  .put("/profilephoto/:id", uploadWorker, workerController.updateAvatarWorker)
  .delete("/profile/:id", workerController.deleteWorker);
module.exports = router;