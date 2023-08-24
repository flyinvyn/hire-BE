const Pool = require("../config/db");

const selectAllSkill = ({ limit, offset, sort, sortby }) => {
    return Pool.query(
        `SELECT skills.*,worker.name,worker.job_desk,worker.domisili,worker.work_place,
        worker.description,worker.photo FROM skills JOIN worker ON skills.id_worker = worker.id_worker ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
    );
};

const selectSkill = (id_skill) => {
    return Pool.query(`SELECT * FROM skills WHERE id_skill = '${id_skill}'`);
};

const selectSkillByWorker = (id_worker) => {
    return Pool.query(`SELECT * FROM skills WHERE id_worker = '${id_worker}'`);
};


const insertSkill = (data) => {
    const { id_skill, skill_name, id_worker } = data;
    return Pool.query(
        `INSERT INTO skills(
            id_skill,
            skill_name,
            id_worker
            )VALUES('${id_skill}','${skill_name}','${id_worker}')`
    );
};

const updateSkill = (data) => {
    const { id_skill, skill_name, id_worker } = data;
    return Pool.query(
        `UPDATE skills SET skill_name='${skill_name}',id_worker='${id_worker}' WHERE id_skill = '${id_skill}'`
    );
};

const deleteSkill = (id_skill) => {
    return Pool.query(
        `DELETE FROM skills WHERE id_skill = '${id_skill}'`
    );
};

const countSkill = () => {
    return Pool.query("SELECT COUNT(*) FROM skills");
};

const findId = (id_skill) => {
    return new Promise((resolve, reject) =>
        Pool.query(
            `SELECT id_skill FROM skills WHERE id_skill='${id_skill}'`,
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

const searchSkill = (skil_name) => {
    return Pool.query(`SELECT skils.id_skill,skils.skil_name,worker.id_worker FROM skils JOIN worker ON skils.id_worker = worker.id_worker WHERE skil_name ILIKE '%${skil_name}%'`);
};

module.exports = {
    selectAllSkill,
    selectSkill,
    selectSkillByWorker,
    insertSkill,
    updateSkill,
    deleteSkill,
    countSkill,
    findId,
    searchSkill
}