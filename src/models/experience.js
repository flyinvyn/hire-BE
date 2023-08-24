const Pool = require("../config/db");

const selectAllExperience = ({ limit, offset, sort, sortby }) => {
    return Pool.query(
        `SELECT experience.*,worker.name,worker.job_desk,worker.domisili,worker.work_place,
        worker.description,worker.photo FROM experience JOIN worker ON experience.id_worker = worker.id_worker ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
    );
};

const selectExperience = (id_exp) => {
    return Pool.query(`SELECT * FROM experience WHERE id_exp = '${id_exp}'`);
};

const selectExperienceByWorker = (id_worker) => {
    return Pool.query(`SELECT * FROM experience WHERE id_worker = '${id_worker}'`);
};

const insertExperience = (data) => {
    const { id_exp, position, company_name, work_start, work_end, description, id_worker } = data;
    const date = new Date().toISOString();
    return Pool.query(
        `INSERT INTO experience(
            id_exp,
            position,
            company_name,
            work_start,
            work_end,
            description,
            create_at,
            id_worker
            )VALUES('${id_exp}','${position}','${company_name}','${work_start}','${work_end}','${description}','${date}','${id_worker}')`
    );
};

const updateExperience = (data) => {
    const { id_exp, position, company_name, work_start, work_end, description, id_worker } = data;
    return Pool.query(
        `UPDATE experience SET position='${position}',company_name='${company_name}',work_start='${work_start}',work_end='${work_end}',description='${description}',id_worker='${id_worker}' WHERE id_exp = '${id_exp}'`
    );
};

const deleteExperience = (id_exp) => {
    return Pool.query(
        `DELETE FROM experience WHERE id_exp = '${id_exp}'`
    );
};

const countExperience = () => {
    return Pool.query("SELECT COUNT(*) FROM experience");
};

const findId = (id_exp) => {
    return new Promise((resolve, reject) =>
        Pool.query(
            `SELECT id_exp FROM experience WHERE id_exp='${id_exp}'`,
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

const searchExperience = (skil_name) => {
    return Pool.query(`SELECT * FROM experience WHERE skil_name ILIKE '%${skil_name}%'`);
};

module.exports = {
    selectAllExperience,
    selectExperience,
    selectExperienceByWorker,
    insertExperience,
    updateExperience,
    deleteExperience,
    countExperience,
    findId,
    searchExperience
}