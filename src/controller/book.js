const { addBook, getBooks, getSinglBook, removeBook } = require("../services");

const createBook = async (req, res, next) => {
  console.log(req.token);
  try {
    const newUser = await addBook(req.body, req.token.id);
    console.log(newUser);

    res.status(201).json({
      status: "success",
      message: `created successfully`,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const allBooks = async (req, res) => {
  const data = await getBooks(req.token.id);
  res.json({
    status: "success",
    message: "successfully fetch all books",
    data,
  });
};

const bookById = async (req, res) => {
  const data = await getSinglBook(req.token.id);
  res.json({
    status: "success",
    message: "successfully fetch book",
    data,
  });
};

const deleteBook = (req, res) => {
  const data = removeBook(req.body.userId, req.token.id);
  res.json({
    status: "success",
    message: "successfully removed book",
    data,
  });
};

module.exports = { createBook, allBooks, bookById, deleteBook };
