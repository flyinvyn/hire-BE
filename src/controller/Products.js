const {
  selectAllProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countProduct,
  findId,
  searchProduct
} = require("../models/Products");
const commonHelper = require("../helper/common");

let productController = {
  getAllProduct: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "name_product";
      const sort = req.query.sort || "ASC";
      const result = await selectAllProduct(limit, offset, sortby, sort);
      const {
        rows: [count],
      } = await countProduct();
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


  getDetailProduct: (req, res) => {
    const id = Number(req.params.id);
    selectProduct(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => res.send(err));
  },
  createProduct: async (req, res) => {
    const { name_product, price, stock, image_product, rate, shop_name } =
      req.body;
    const {
      rows: [count],
    } = await countProduct();
    const id_product = Number(count.count) + 1;
    const data = {
      id_product,
      name_product,
      price,
      stock,
      image_product,
      rate,
      shop_name,
    };
    insertProduct(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Product created")
      )
      .catch((err) => res.send(err));
  },
  updateProduct: async (req, res) => {
    try {
      const id_product = Number(req.params.id);
      const { name_product, price, stock, image_product, rate, shop_name } =
        req.body;
      const { rowCount } = await findId(id_product);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const data = {
        id_product,
        name_product,
        price,
        stock,
        image_product,
        rate,
        shop_name,
      };
      updateProduct(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id_product = Number(req.params.id);
      const { rowCount } = await findId(id_product);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deleteProduct(id_product)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product deleted")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  searchProduct:async (req, res) => {
    const search = req.query.keyword;
    await searchProduct(search)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success");
      })
      .catch((err) => {
        res.send(err)
      });
  },
};

module.exports = productController;
