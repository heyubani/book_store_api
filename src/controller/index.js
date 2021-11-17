const {createUser, validatePassword, getBooks } = require('../services')

const createNewUser = async(req, res, next) => {
    try {
        const { body } = req
        const newUser  = await createUser(body)
        console.log(newUser)
        const { password, ...user } = newUser

        res.status(201).json({
            status: 'success',
            message: `created successfully`,
            data: user
        })
    } 
    catch (error) {
        next(error)
    }
}

const loginUser = async(req, res, next) => {
    try {
        const { password, email } = req.body
        const token = await validatePassword(email, password)

        if (!token) {
            res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials',
                data: 'Error logging in user'
            })
        } else {
            res.status(201).json({
              status: "success",
              message: "User is authenticated ",
              data: req.body,
              token
            });
        }
    } catch (error) {
        next(error)
    }
}

const allBooks = (req, res) => {
    const books = res.getBooks();
    res.json({
        status: "success",
        message: "successfully fetch all books",
        data: books
    })
}

// const isUser = (req, res) => {
//     if(req.body.user)
// }

module.exports = { createNewUser, loginUser, allBooks  }