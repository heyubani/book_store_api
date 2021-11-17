const express = require('express')
const router = express.Router()
const { validateUser, checkUser, verifyToken } = require("../middleware");
const { createNewUser, loginUser } = require("../controller/index");
const { createUserSchema, loginUserSchema } = require("../validation");

router.post(
  "/api/signup",
  validateUser(createUserSchema),
  checkUser("signup"),
  createNewUser
);

router.post(
  "/api/login",
  validateUser(loginUserSchema),
  checkUser("login"),
  loginUser
);

router.post("/api/book", verifyToken)
  .get(".api/book");

module.exports = router