const Pool = require("../config/db");

const create = (data) => {
  const { id, fullname, email, passwordHash, role } = data;
  return Pool.query(
    `INSERT INTO users(
        id,
        fullname,
        email,
        password,
        role
        ) VALUES('${id}','${fullname}','${email}','${passwordHash}','${role}')`
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE email='${email}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  create,
  findEmail,
};
