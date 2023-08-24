const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { create, findEmail, countUsers, findId, selectAllWorker, selectWorker, updateWorker, deleteWorker } = require("../models/users");
const jwt = require("jsonwebtoken");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");
const cloudinary = require('../middleware/cloudinary')

let userController = {
  getAllUsers: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "name";
      const sort = req.query.sort || "ASC";
      let result = await selectAllWorker({ limit, offset, sort, sortby });
      const {
        rows: [count],
      } = await countUsers();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(
        res,
        result.rows,
        200,
        "Get Data Worker Success",
        pagination
      );
    } catch (err) {
      console.log(err);
    }
  },

  getDetailWorker: (req, res) => {
    const id_worker = String(req.params.id);
    selectWorker(id_worker)
      .then((result) => {
        // client.setEx(`product/${id}`,60*60,JSON.stringify(result.rows))
        commonHelper.response(res, result.rows, 200, "get data success")
      })
      .catch((err) => res.send(err));
  },

  registerUser: async (req, res) => {
    const { name, phone_number, email, password, role, job_desk, domisili, work_place, description } = req.body;
    const passwordHash = bcrypt.hashSync(password);
    let photo = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      photo = result.secure_url;
    }
    const id_worker = uuidv4();
    data = {
      id_worker,
      name,
      phone_number,
      email,
      passwordHash,
      role,
      job_desk,
      domisili,
      work_place,
      description,
      photo
    };
    create(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Register succesfully")
      )
      .catch((err) => res.send(err));
  },

  updateWorker: async (req, res) => {
    try {
      const id_worker = String(req.params.id)
      const { name, phone_number, email, role, job_desk, domisili, work_place, description } =
        req.body;
      const { rowCount } = await findId(id_worker);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      let photo = null;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                photo = result.secure_url;
            }
      const data = {
        id_worker,
        name,
        phone_number,
        email,
        role,
        job_desk,
        domisili,
        work_place,
        description,
        photo
      };
      updateWorker(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Worker updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  deleteWorker: async (req, res) => {
    try {
      const id_worker = String(req.params.id);
      const { rowCount } = await findId(id_worker);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deleteWorker(id_worker)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Worker deleted")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
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
    commonHelper.response(res, user, 201, "login is successfuly");

    // const Schema = Joi.object({
    //   email:Joi.string(),
    //   password:Joi.number()
    // })
    // const result = Schema.validate(req.body);
    // const { value, error } = result;
    // if(error){
    //   return commonHelper.response(res, result.rows, 422, error.message)
    // }
  },
  profile: async (req, res, next) => {
    const email = req.payload.email;
    const {
      rows: [users],
    } = await findEmail(email);
    delete users.password;
    commonHelper.response(res, users, 200, "get data successfuly");
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
