const express = require("express");
const router = express.Router();
const userController = require("../controller/users");
const { protect } = require("../middleware/auth");
const upload = require('../middleware/uploadProfile')

router
  .get("/", userController.getAllUsers)
  .get("/:id", userController.getDetailWorker)
  .put("/:id",upload, userController.updateWorker)
  .delete("/:id", userController.deleteWorker)
  .post("/register",upload, userController.registerUser)
  .post("/login", userController.loginUser)
  .get("/profile", userController.profile)
  .post("/refreshToken", userController.refreshToken)

module.exports = router;
