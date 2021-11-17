const queries = {
    addNewUser: `
        INSERT INTO users (
            first_name,
            last_name,
            email,
            password,
            role
        ) VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `,

    getUser: `
        SELECT * FROM users
        WHERE email=$1
    `,

    getUserById: `
    SELECT * FROM users
    WHERE id=$1
    `,

    getBooks: `
    SELECT * FROM userbooks
    `

}

module.exports = queries