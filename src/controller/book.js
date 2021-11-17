

const createBook = async (req, res, next) => {
  try {
    const {title, description,  } = req.body;
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
