const Pool = require("../config/db");

const selectAllWorker = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT worker.id_worker, worker.name,worker.job_desk,worker.domisili,worker.photo,array_agg(skills.skill_name ORDER BY skills.skill_name) AS skills
    FROM worker
    LEFT JOIN skills ON worker.id_worker = skills.id_worker
    GROUP BY worker.id_worker, worker.name, worker.domisili, worker.job_desk
    ORDER BY ${sortby} ${sort}
    LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectWorker = (id_worker) => {
  return Pool.query(`SELECT * FROM worker
  WHERE id_worker = '${id_worker}'`);
};

const create = (data) => {
  const { id_worker, name, phone_number, email, passwordHash, role, job_desk, domisili, work_place, description } = data;
  return Pool.query(
    `INSERT INTO worker(
        id_worker,
        name,
        phone_number,
        email,
        password,
        role
        ) VALUES('${id_worker}','${name}','${phone_number}','${email}','${passwordHash}','${role}','${job_desk}','${domisili}','${work_place}','${description}'`
  );
};

const updateWorker = (data) => {
  const {
    id_worker,
    name,
    job_desk,
    domisili,
    work_place,
    description,
  } = data;
  return Pool.query(
    `UPDATE worker SET name='${name}', job_desk='${job_desk}',domisili='${domisili}',work_place='${work_place}',
      description='${description}' WHERE id_worker = '${id_worker}'`
  );
};

const updatePhoto = (data) => {
  const {
    id_worker,
    photo
  } = data;
  return Pool.query(
    `UPDATE worker SET photo='${photo}' WHERE id_worker = '${id_worker}'`
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM worker WHERE email='${email}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const deleteWorker = (id_worker) => {
  return Pool.query(`DELETE FROM worker WHERE id_worker='${id_worker}'`);
};

const countUsers = () => {
  return Pool.query("SELECT COUNT(*) FROM worker");
};

const findId = (id_worker) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT id_worker FROM worker WHERE id_worker='${id_worker}'`,
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

module.exports = {
  create,
  selectAllWorker,
  selectWorker,
  updateWorker,
  deleteWorker,
  findEmail,
  countUsers,
  updatePhoto,
  findId
};
