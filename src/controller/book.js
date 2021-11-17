const { addBook } = require("../services");

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
module.exports = { createBook };
