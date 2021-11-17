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
    `,
  userbook: `
      INSERT INTO userbooks(
        title,
        author,
        user_id
     ) VALUES($1, $2, $3)
     RETURNING *
    `,
};
module.exports = queries;
