const Pool = require("../config/db");

const selectAllWorker = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM worker ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectWorker = (id_worker) => {
  return Pool.query(`SELECT * FROM worker WHERE id_worker = '${id_worker}'`);
};

const deleteWorker = (id_worker) => {
  return Pool.query(`DELETE FROM worker WHERE id_worker  = '${id_worker}'`);
};

const createWorker = (data) => {
  const {
    id_worker,
    name,
    email,
    phone_number,
    password,
    confirmpasswordHash,
    role,
    verify,
  } = data;
  return Pool.query(`INSERT INTO worker(id_worker,name,email,phone_number,password,confirmpassword,role,verify) 
    VALUES ('${id_worker}','${name}','${email}','${phone_number}','${password}','${confirmpasswordHash}','${role}','${verify}')`);
};

const createWorkerVerification = (worker_verification_id, worker_id, token) => {
  return Pool.query(
    `insert into worker_verification ( id , worker_id , token ) values ( '${worker_verification_id}' , '${worker_id}' , '${token}' )`
  );
};

const checkWorkerVerification = (queryUsersId, queryToken) => {
  return Pool.query(
    `select * from worker_verification where worker_id='${queryUsersId}' and token = '${queryToken}' `
  );
};

const cekWorker = (email) => {
  return Pool.query(
    `select verify from worker where email = '${email}' `
  );
};

const deleteWorkerVerification = (queryUsersId, queryToken) => {
  return Pool.query(
    `delete from worker_verification  where worker_id='${queryUsersId}' and token = '${queryToken}' `
  );
};

const updateAccountVerification = (queryUsersId) => {
  return Pool.query(
    `update worker set verify='true' where id_worker='${queryUsersId}' `
  );
};

const updateWorker = (data) => {
  const { id_worker, job_desk, domisili, work_place, description } = data;
  return Pool.query(
    `UPDATE worker SET  job_desk = '${job_desk}', domisili = '${domisili}', work_place = '${work_place}', description = '${description}' WHERE id_worker = '${id_worker}'`
  );
};

const updateAvatarWorker = (data) => {
  const { id_worker, photo } = data;
  return Pool.query(
    `UPDATE worker SET  photo = '${photo}' WHERE id_worker = '${id_worker}'`
  );
};


//FIND EMAIL
const findUUID = (id_worker) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM worker WHERE id_worker= '${id_worker}' `,
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

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM worker WHERE email= '${email}' `,
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

const countData = () => {
  return Pool.query(`SELECT COUNT(*) FROM worker`);
};

module.exports = {
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
};