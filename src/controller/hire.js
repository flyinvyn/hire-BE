const {v4: uuidv4} = require('uuid');
const commonHelper = require('../helper/common');
let {selectAllHire, selectHireWorker, selectHireRecruiter, deleteHire, createHire, findID, countData} = require('../models/hire');
const sendOfferingEmail = require('../middleware/sendoffering');
const sendoffering = require('../middleware/sendoffering');

let hireController = {
  getAllHire: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || 'id';
      const sort = req.query.sort || 'ASC';
      let result = await selectAllHire({limit, offset, sort, sortby});
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(res, result.rows, 200, 'Get Hire Data Success', pagination);
    } catch (err) {
      console.log(err);
    }
  },

  getSelectHireWorker: async (req, res) => {
    const id_worker = String(req.params.id);
    selectHireWorker(id_worker)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, 'Get Hire Detail Success');
      })
      .catch((err) => res.send(err));
  },

  getSelectHireRecruiter: async (req, res) => {
    const rec_id = String(req.params.id);
    selectHireRecruiter(rec_id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, 'Get Hire Detail Success');
      })
      .catch((err) => res.send(err));
  },

  createHire: async (req, res) => {
    const {offering, description, id_worker, rec_id, name, email, rec_compname, rec_email} = req.body;
    const id = uuidv4();
    const data = {
      id,
      offering,
      description,
      name,
      id_worker,
      email,
      rec_id,
      rec_compname,
      rec_email,
    };

    await sendoffering(rec_compname, rec_email, email, name, offering, description, `Job Offer: ${offering} from ${rec_compname}`);

    createHire(data)
      .then((result) => commonHelper.response(res, result.rows, 201, 'Create Hire Success'))
      .catch((err) => res.send(err));
  },

  deleteHire: async (req, res) => {
    try {
      const id = String(req.params.id);
      const {rowCount} = await findID(id);
      if (!rowCount) {
        res.json({message: 'ID Not Found'});
      }
      deleteHire(id)
        .then((result) => commonHelper.response(res, result.rows, 200, 'Delete Hire Success'))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = hireController;