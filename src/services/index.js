const db = require('../../db')
const queries = require("../../db/queries/")
const { hashPassword, comparePassword, generateToken } = require("../utils");


// getting user
const getUser = (email) => db.any(queries.getUser, email);

const createUser = async (body) => {
  const { first_name, last_name, email, password } = body;
  const encryptedPassword = await hashPassword(password);
  const DEFUALT_ROLE = 'user';
  const payload = [
    first_name,
    last_name,
    email,
    encryptedPassword,
    DEFUALT_ROLE,
  ];
  return db.one(queries.addNewUser, payload);
};

const validatePassword = async (email, password) => {
  const user = await getUser(email);

  if (user.length === 1) {
    const isValid = await comparePassword(password, user[0].password);
    const userdata = user[0];
    console.log(userdata);
    if (isValid) {
      const token = await generateToken({
        id: userdata.id,
        role: userdata.role,
      });
      return token;
    }
  }
  return false;
};

const updatePassword = async (req) => {
  const {
    body: { password },
    user: { id },
  } = req;
  const encryptedPassword = await hashPassword(password);
  return db.any(queries.updatePassword, [encryptedPassword, id]);
};

const addBook = (body, userId) => {
  const { title, author } = body;
  const payload = [title, author, userId];
  return db.any(queries.userbook, payload);
};

const getBooks = (userId) => {
  return db.any(queries.getBooks, [userId]);
};

const getSinglBook = (userId) => {
  return db.any(queries.getSinglBook, [userId]);
};

const removeBook = (userId) => {
  return db.any(queries.removeBook, [userId]);
};
module.exports = {
  createUser,
  validatePassword,
  getUser,
  updatePassword,
  getBooks,
  addBook,
  getSinglBook,
  removeBook
};