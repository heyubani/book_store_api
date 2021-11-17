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

  userbook: `
    INSERT INTO userbooks(
      title,
      author,
      user_id
      ) VALUES($1, $2, $3)
      RETURNING *
      `,

  getBooks: `
      SELECT * FROM userbooks
      WHERE user_id=$1
      `,

  getSinglBook: `
      SELECT * FROM userbooks
      WHERE user_id=$1 AND id =$2
      `,
  removeBook: `
      SELECT * FROM userbooks
      WHERE user_id=$1 AND id =$2
      `,
  getUserById: `
    SELECT * FROM userbooks
    WHERE id=$1
    `,
};
module.exports = queries;
