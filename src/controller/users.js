const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { create, findEmail } = require("../models/users");
const jwt = require("jsonwebtoken");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");

let userController = {
  registerUser: async (req, res) => {
    let { fullname, email, password, role } = req.body;
    const { rowCount } = await findEmail(email);
    if (rowCount) {
      return res.json({ message: "Email is Already taken" });
    }
    const passwordHash = bcrypt.hashSync(password);
    const id = uuidv4();
    data = {
      id,
      fullname,
      email,
      passwordHash,
      role,
    };
    create(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Register succesfully")
      )
      .catch((err) => res.send(err));
  },
  loginUser: async (req, res) => {
    let { email, password } = req.body;
    const {
      rows: [user],
    } = await findEmail(email);
    if (!user) {
      return res.json({ message: "Email is incorrect" });
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.json({ message: "Password is incorrect" });
    }
    delete user.password;
    const payload = {
      email: user.email,
      role: user.role,
    };
    user.token = authHelper.generateToken(payload);
    user.refreshToken = authHelper.generateRefreshToken(payload);
    commonHelper.response(res, user, 201, "login is successful");
  },
  profile: async (req, res, next) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200, "get data successfuly");
  },
  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res, result, 200, "Token is Already generate");
  },
};

module.exports = userController;
