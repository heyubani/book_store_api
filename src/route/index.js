const express = require('express')
const router = express.Router()
const { validateUser, checkUser, verifyToken } = require("../middleware");
const { createNewUser, loginUser } = require("../controller/index");
const {
  createBook,
  allBooks,
  bookById,
  deleteBook,
} = require("../controller/book");
const { createUserSchema, loginUserSchema } = require("../validation");

router.post("/api/signup", validateUser(createUserSchema), createNewUser);

router.post("/api/login", validateUser(loginUserSchema), loginUser);

router.post("/api/book", verifyToken(), createBook);

router.get("/api/books", verifyToken(), allBooks);

router.get("/api/book/:id", verifyToken(), bookById);

router.delete("/api/book/:id", verifyToken(), deleteBook);



module.exports = router