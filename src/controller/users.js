const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");
const cloudinary = require("../middleware/cloudinary");
const crypto = require("crypto");
let {
  selectAllWorker,
  selectWorker,
  deleteWorker,
  createWorker,
  updateWorker,
  updateAvatarWorker,
  createWorkerVerification,
  checkWorkerVerification,
  cekWorker,
  deleteWorkerVerification,
  updateAccountVerification,
  findUUID,
  findEmail,
  countData,
} = require("../models/users");
const sendmailworker = require("../middleware/sendmailworker");

let workerController = {
  getAllWorker: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id_worker";
      const sort = req.query.sort || "ASC";
      let result = await selectAllWorker({ limit, offset, sort, sortby });
      const {
        rows: [count],
      } = await countData();
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
        "Get Worker Data Success",
        pagination
      );
    } catch (err) {
      console.log(err);
    }
  },

  getSelectWorker: async (req, res) => {
    const id_worker = String(req.params.id);
    selectWorker(id_worker)
      .then((result) => {
        commonHelper.response(
          res,
          result.rows,
          200,
          "Get Worker Detail Success"
        );
      })
      .catch((err) => res.send(err));
  },

  registerWorker: async (req, res) => {
    const {
      name,
      email,
      phone_number,
      password,
      confirmpassword,
      role
    } = req.body;
    const checkEmail = await findEmail(email);
    try {
      if (checkEmail.rowCount == 1) throw "Email already used";
      // delete checkEmail.rows[0].password;
    } catch (error) {
      delete checkEmail.rows[0].password;
      return commonHelper.response(res, null, 403, error);
    }

    const confirmpasswordHash = bcrypt.hashSync(confirmpassword);
    const id_worker = uuidv4();

    const schema = Joi.object().keys({
      name: Joi.required(),
      role: Joi.required(),
      email: Joi.string().required(),
      phone_number: Joi.any(),
      password: Joi.string().min(3).max(15).required(),
      confirmpassword: Joi.ref("password"),
    });
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      console.log(error);
      return res.send(error.details);
    }

    const verify = "false";
    const worker_verification_id = uuidv4().toLocaleLowerCase();
    const worker_id = id_worker;
    const token = crypto.randomBytes(64).toString("hex");
    const url = `${process.env.BASE_URL}worker/verify?id=${worker_id}&token=${token}`;

    await sendmailworker(name, email, "Verify Email", url);

    const data = {
      id_worker,
      name,
      email,
      phone_number,
      password,
      confirmpasswordHash,
      role,
      verify,
    };
    createWorker(data);

    await createWorkerVerification(worker_verification_id, worker_id, token);

    commonHelper.response(
      res,
      null,
      201,
      "Sign Up Success, Please check your email for verification"
    );
  },

  VerifyAccount: async (req, res) => {
    try {
      const queryUsersId = req.query.id;
      const queryToken = req.query.token;
      console.log(queryUsersId)

      if (typeof queryUsersId === "string" && typeof queryToken === "string") {
        const checkUsersVerify = await findUUID(queryUsersId);

        if (checkUsersVerify.rowCount == 0) {
          return commonHelper.response(
            res,
            null,
            403,
            "Error users has not found"
          );
        }

        if (checkUsersVerify.rows[0].verify != "false") {
          return commonHelper.response(
            res,
            null,
            403,
            "Users has been verified"
          );
        }

        const result = await checkWorkerVerification(
          queryUsersId,
          queryToken
        );


        if (result.rowCount == 0) {
          return commonHelper.response(
            res,
            null,
            403,
            "Error invalid credential verification"
          );
        } else {
          await updateAccountVerification(queryUsersId);
          await deleteWorkerVerification(queryUsersId, queryToken);
          commonHelper.response(res, null, 200, "Users verified succesful");
        }
      } else {
        return commonHelper.response(
          res,
          null,
          403,
          "Invalid url verification"
        );
      }
    } catch (error) {
      console.log(error);

      // res.send(createError(404));
    }
  },

  updateWorker: async (req, res) => {
    try {
      const { job_desk, domisili, work_place, description } = req.body;
      const id_worker = String(req.params.id);
      const { rowCount } = await findUUID(id_worker);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const data = {
        id_worker,
        job_desk,
        domisili,
        work_place,
        description,
      };

      updateWorker(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Update Users Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  updateAvatarWorker: async (req, res) => {
    try {
      const id_worker = String(req.params.id);
      const { rowCount } = await findUUID(id_worker);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      let photo = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        photo = result.secure_url;
      }
      const data = {
        id_worker,
        photo,
      };

      updateAvatarWorker(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Update Users Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  deleteWorker: async (req, res) => {
    try {
      const id_worker = String(req.params.id);
      const { rowCount } = await findUUID(id_worker);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      deleteWorker(id_worker)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Delete Users Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  loginWorker: async (req, res) => {
    const { email, confirmpassword } = req.body;
    const {
      rows: [verify]
    } = await cekWorker(email);
    console.log(verify);
    if (verify.verify === "false") {
      return res.json({
        message: "worker is unverify",
      });
    }
    const {
      rows: [users],
    } = await findEmail(email);
    if (!users) {
      return res.json({ message: "Enter a valid email" });
    }
    const isValidPassword = bcrypt.compareSync(
      confirmpassword,
      users.confirmpassword
    );
    if (!isValidPassword) {
      return res.json({ message: "Wrong password" });
    }
    delete users.confirmpassword;
    const payload = {
      email: users.email,
      role: users.role
    };
    users.token_user = authHelper.generateToken(payload);
    users.refreshToken = authHelper.generateRefreshToken(payload);
    commonHelper.response(res, users, 201, "Login Successfuly");
  },

  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      users_email: decoded.users_email,
    };
    const result = {
      token_user: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res, result, 200);
  },
};

module.exports = workerController;