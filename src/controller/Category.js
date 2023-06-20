const {
  selectAllCategory,
  searchCategory,
  selectCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  countCategory,
  findId,
} = require("../models/Category");
const commonHelper = require("../helper/common");

let categoryController = {
  getAllCategory: async (req, res) => {
    try {
      
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "name_category";
      const sort = req.query.sort || "ASC";
      let result = await selectAllCategory(limit, offset, sortby, sort);
      const {
        rows: [count],
      } = await countCategory();
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
  getDetailCategory: (req, res) => {
    const id_category = Number(req.params.id);
    selectCategory(id_category)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => res.send(err));
  },
  createCategory: async (req, res) => {
    const { name_category, image_category } = req.body;
    const {
      rows: [count],
    } = await countCategory();
    const id_category = Number(count.count) + 1;
    const data = {
      id_category,
      name_category,
      image_category,
    };
    insertCategory(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Product created")
      )
      .catch((err) => res.send(err));
  },
  updateCategory: async (req, res) => {
    try {
      const id_category = Number(req.params.id);
      const { name_category, image_category } = req.body;
      const { rowCount } = await findId(id_category);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const data = {
        id_category,
        name_category,
        image_category,
      };
      updateCategory(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const id_category = Number(req.params.id);
      const { rowCount } = await findId(id_category);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deleteCategory(id_category)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product deleted")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  searchCategory:async (req, res) => {
    const search = req.query.keyword;
    await searchCategory(search)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => {
        res.send(err)
      });
  },
};

module.exports = categoryController;
