const Pool = require("../config/db");

const selectAllProduct = ({limit, offset, sortby, sort}) => {
  return Pool.query(
    `SELECT * FROM product ORDER BY  ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectProduct = (id_product) => {
  return Pool.query(`SELECT * FROM product WHERE id_product = ${id_product}`);
};

const insertProduct = (data) => {
  const {
    id_product,
    name_product,
    stock,
    price,
    image_product,
    rate,
    shop_name,
  } = data;
  return Pool.query(
    `INSERT INTO product(
        id_product,
        name_product,
        stock,
        price,
        image_product,
        rate,
        shop_name) VALUES(${id_product},'${name_product}',${stock},${price},'${image_product}',${rate},'${shop_name}')`
  );
};

const updateProduct = (data) => {
  const {
    id_product,
    name_product,
    price,
    stock,
    image_product,
    rate,
    shop_name,
  } = data;
  return Pool.query(
    `UPDATE product SET name_product='${name_product}', stock=${stock}, price=${price}, image_product='${image_product}',rate=${rate},shop_name='${shop_name}' WHERE id_product=${id_product}`
  );
};

const deleteProduct = (id_product) => {
  return Pool.query(`DELETE FROM product WHERE id_product=${id_product}`);
};

const countProduct = () => {
  return Pool.query("SELECT COUNT(*) FROM product");
};

const findId = (id_product) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT id_product FROM product WHERE id_product=${id_product}`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};
const searchProduct = (name_product) => {
  return Pool.query(`SELECT * FROM product WHERE name_product ILIKE '%${name_product}%'`);
};

module.exports = {
  selectAllProduct,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  countProduct,
  findId,
  searchProduct
};
