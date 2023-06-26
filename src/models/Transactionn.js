const Pool = require("../config/db");

const selectAllTransaction = ({limit, offset, sortby, sort}) => {
  return Pool.query(
    `SELECT transactionn.id_transaction,transactionn.create_date,transactionn.qty,transactionn.shipping,transactionn.total_price,transactionn.adress,product.name_product,product.price,product.stock,product.image_product,product.rate,product.shop_name,
    category.name_category,category.image_category FROM transactionn JOIN product ON transactionn.id_product = product.id_product
    JOIN category ON transactionn.id_category = category.id_category ORDER BY  ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectTransaction = (id_transaction) => {
  return Pool.query(
    `SELECT transactionn.id_transaction,transactionn.create_date,transactionn.qty,transactionn.shipping,transactionn.total_price,transactionn.adress,product.name_product,product.price,product.stock,product.image_product,product.rate,product.shop_name,
    category.name_category,category.image_category FROM transactionn JOIN product ON transactionn.id_product = product.id_product
    JOIN category ON transactionn.id_category = category.id_category WHERE id_transaction = ${id_transaction}`
  );
};

const insertTransaction = (data) => {
  const {
    id_transaction,
    qty,
    shipping,
    total_price,
    adress,
    id_product,
    id_category,
  } = data;
  const date = new Date().toISOString()
  return Pool.query(
    `INSERT INTO transactionn(id_transaction,create_date,qty,shipping,total_price,adress,id_product,id_category) VALUES(
      ${id_transaction},
      '${date}',
      ${qty},
      '${shipping}',
      ${total_price},
      '${adress}',
      ${id_product},
      ${id_category})`
  );
};

const updateTransaction = (data) => {
  const {
    id_transaction,
    create_date,
    qty,
    shipping,
    total_price,
    adress,
    id_product,
    id_category,
  } = data;
  return Pool.query(
    `UPDATE transactionn SET create_date='${create_date}',qty=${qty},shipping='${shipping}',total_price=${total_price},adress='${adress}',
    id_product=${id_product},id_category=${id_category} WHERE id_transaction=${id_transaction}`
  );
};

const deleteTransaction = (id_transaction) => {
  return Pool.query(
    `DELETE FROM transactionn WHERE id_transaction=${id_transaction}`
  );
};

const countTransaction = () => {
  return Pool.query("SELECT COUNT(*) FROM transactionn");
};

const findId = (id_transaction) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT id_transaction FROM transactionn WHERE id_transaction=${id_transaction}`,
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

const searchTransaction = (adress) => {
  return Pool.query(`SELECT transactionn.id_transaction,transactionn.create_date,transactionn.qty,transactionn.shipping,transactionn.total_price,transactionn.adress,product.name_product,product.price,product.stock,product.image_product,product.rate,product.shop_name,
  category.name_category,category.image_category FROM transactionn JOIN product ON transactionn.id_product = product.id_product
  JOIN category ON transactionn.id_category = category.id_category WHERE adress ILIKE '%${adress}%'`);
};

module.exports = {
  selectAllTransaction,
  searchTransaction,
  selectTransaction,
  insertTransaction,
  updateTransaction,
  deleteTransaction,
  countTransaction,
  findId
};
