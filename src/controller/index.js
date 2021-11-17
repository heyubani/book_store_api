const { createUser, validatePassword, getBooks } = require("../services");
const { checkUser } = require("../middleware");

const createNewUser = async (req, res, next) => {
  try {
    const existingUser = await checkUser(req.body.email);
    if (existingUser) {
      return res.json({
        status: "failed",
        message: "User already exist",
      });
    }

    const { body } = req;
    const newUser = await createUser(body);
    console.log(newUser);
    const { password, ...user } = newUser;

    res.status(201).json({
      status: "success",
      message: `created successfully`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const existingUser = await checkUser(req.body.email);
    console.log(existingUser, "-----------");
    if (!existingUser) {
      return res.json({
        status: "failed",
        message: `There is no user with email ${req.body.email}`,
      });
    }
    const token = await validatePassword(email, password);

    if (!token) {
      res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
        data: "Error logging in user",
      });
    } else {
      res.status(201).json({
        status: "success",
        message: "User is authenticated ",
        data: req.body,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createNewUser, loginUser };
