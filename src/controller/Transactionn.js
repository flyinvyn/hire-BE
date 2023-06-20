const {
  selectAllTransaction,
  searchTransaction,
  selectTransaction,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
  countTransaction,
  findId,
} = require("../models/Transactionn");
const commonHelper = require("../helper/common");

let transactionController = {
  getAllTransaction: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "adress";
      const sort = req.query.sort || "ASC";
      let result = await selectAllTransaction(limit, offset, sortby, sort);
      const {
        rows: [count],
      } = await countTransaction();
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
        "get data success",
        pagination
      );
    } catch (err) {
      console.log(err);
    }
  },
  getDetailTransaction: (req, res) => {
    const id_transaction = Number(req.params.id);
    selectTransaction(id_transaction)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => res.send(err));
  },
  createTransaction: async (req, res) => {
    const {
      qty,
      shipping,
      total_price,
      adress,
      id_product,
      id_category,
    } = req.body;
    const {
      rows: [count],
    } = await countTransaction();
    const id_transaction = Number(count.count) + 1;
    const data = {
      id_transaction,
      qty,
      shipping,
      total_price,
      adress,
      id_product,
      id_category
    };
    insertTransaction(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Product created")
      )
      .catch((err) => res.send(err));
  },
  updateTransaction: async (req, res) => {
    try {
      const id_transaction = Number(req.params.id);
      const { create_date,
        qty,
        shipping,
        total_price,
        adress,
        id_product,
        id_category } = req.body;
      const { rowCount } = await findId(id_transaction);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const data = {
        id_transaction,
        create_date,
        qty,
        shipping,
        total_price,
        adress,
        id_product,
        id_category
      };
      updateTransaction(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteTransaction: async (req, res) => {
    try {
      const id_transaction = Number(req.params.id);
      const { rowCount } = await findId(id_transaction);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deleteTransaction(id_transaction)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product deleted")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  searchTransaction:async (req, res) => {
    const search = req.query.keyword;
    await searchTransaction(search)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => {
        res.send(err)
      });
  },
};

module.exports = transactionController;
