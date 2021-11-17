const { getUser } = require("../services");
const jwt = require("jsonwebtoken");

const checkUser = () => async (req, res, next) => {
  try {
    const { email } = req.body;
    const [user] = await getUser(email);
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid credentials",
        data: [],
      });
    }
    next();
  } catch (error) {
    return next(error);
  }
};

// verify token
const verifyToken = () => async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"] || req.query.token;

    if (!token)
      return res.status(403).json({
        status: "fail",
        message: "No token provided.",
      });
       

    const tokenValidated =  jwt.verify(token, process.env.RESET_TOKEN_KEY)
    if (!tokenValidated) {
      return res.status(403).json({
        status: "fail",
        message: "Failed to authenticate token.",
      });
    }

    req.token = tokenValidated;
    return next();
  } catch (err) {
    next(err);
  }
};

// Alternative
const validateUser = data => async (req, res, next) => {
  try {
    const getType = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };
    const options = {
      language: { key: "{{key}}" },
    };
    const result = getType.body;
    const isValid = await data.schema.validate(result, options);
    if (!isValid.error) {
      // req.body = isValid.value;
      return next();
    }
    const { message } = isValid.error.details[0];
    return res.status(400).json({
      status: "fail",
      message: message.replace(/[\"]/gi, ""),
      errors: data.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateUser,
  verifyToken,
  checkUser,
};
