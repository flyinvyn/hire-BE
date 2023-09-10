const Pool = require('../config/db');

//GET ALL
const selectAllHire = ({limit, offset, sort, sortby}) => {
  return Pool.query(`SELECT * FROM hire ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

//GET SELECT HIRE
const selectHireWorker = (id_worker) => {
  return Pool.query(`SELECT * FROM hire WHERE id_worker = '${id_worker}'`);
};

const selectHireRecruiter = (rec_id) => {
  return Pool.query(`SELECT * FROM hire WHERE rec_id = '${rec_id}'`);
};

//DELETE SELECT HIRE
const deleteHire = (id) => {
  return Pool.query(`DELETE FROM hire WHERE id  = '${id}'`);
};

//POST HIRE
const createHire = (data) => {
  const {id, offering, description, id_worker, rec_id, name, email, rec_compname, rec_email} = data;
  return Pool.query(`INSERT INTO hire(id, offering, description,id_worker, rec_id, name, email, rec_compname, rec_email)  
    VALUES ('${id}','${offering}','${description}','${id_worker}','${rec_id}','${name}','${email}','${rec_compname}','${rec_email}')`);
};

//FIND EMAIL
const findID = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM hire WHERE id= '${id}' `, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

//COUNT DATA
const countData = () => {
  return Pool.query(`SELECT COUNT(*) FROM hire`);
};

module.exports = {
  selectAllHire,
  selectHireWorker,
  selectHireRecruiter,
  deleteHire,
  createHire,
  findID,
  countData,
};