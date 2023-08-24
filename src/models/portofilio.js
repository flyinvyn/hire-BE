const Pool = require("../config/db");

const selectAllPortofolio = ({ limit, offset, sort, sortby }) => {
    return Pool.query(
        `SELECT portofolio.*,worker.name,worker.job_desk,worker.domisili,worker.work_place,
        worker.description,worker.photo FROM portofolio JOIN worker ON portofolio.id_worker = worker.id_worker ORDER BY ${ sortby } ${ sort } LIMIT ${ limit } OFFSET ${ offset }`
    );
};

const selectPortofolio = (id_porto) => {
    return Pool.query(`SELECT * FROM portofolio WHERE id_porto = '${id_porto}'`);
};

const selectPortofolioByWorker = (id_worker) => {
    return Pool.query(`SELECT * FROM portofolio WHERE id_worker = '${id_worker}'`);
};

const insertPortofolio = (data) => {
    const { id_porto, apk_name, link_repo, type, photo, id_worker } = data;
    const date = new Date().toISOString();
    return Pool.query(
        `INSERT INTO portofolio(
            id_porto,
            apk_name,
            link_repo,
            type,
            photo,
            create_at,
            id_worker
            )VALUES('${id_porto}','${apk_name}','${link_repo}','${type}','${photo}','${date}','${id_worker}')`
    );
};

const updatePortofolio = (data) => {
    const { id_porto, apk_name, link_repo, type, photo, id_worker } = data;
    return Pool.query(
        `UPDATE portofolio SET apk_name='${apk_name}',link_repo='${link_repo}',type='${type}',photo='${photo}',id_worker='${id_worker}' WHERE id_porto = '${id_porto}'`
    );
};

const deletePortofolio = (id_porto) => {
    return Pool.query(
        `DELETE FROM portofolio WHERE id_porto = '${id_porto}'`
    );
};

const countPortofolio = () => {
    return Pool.query("SELECT COUNT(*) FROM portofolio");
};

const findId = (id_porto) => {
    return new Promise((resolve, reject) =>
        Pool.query(
            `SELECT id_porto FROM portofolio WHERE id_porto='${id_porto}'`,
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

const searchPortofolio = (apk_name) => {
    return Pool.query(`SELECT * FROM portofolio WHERE apk_name ILIKE '%${apk_name}%'`);
};

module.exports = {
    searchPortofolio,
    selectAllPortofolio,
    selectPortofolio,
    insertPortofolio,
    updatePortofolio,
    deletePortofolio,
    findId,
    countPortofolio,
    selectPortofolioByWorker
}