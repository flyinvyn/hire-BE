const {
    selectAllExperience,
    selectExperience,
    selectExperienceByWorker,
    insertExperience,
    updateExperience,
    deleteExperience,
    countExperience,
    findId,
    searchExperience
} = require('../models/experience')
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");


const experienceController = {
    getAllExperience: async (req, res) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 100;
            const offset = (page - 1) * limit;
            const sortby = req.query.sortby || "position";
            const sort = req.query.sort || "ASC";
            let result = await selectAllExperience({ limit, offset, sort, sortby });
            const {
                rows: [count],
            } = await countExperience();
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
                "Get Data experience Success",
                pagination
            );
        } catch (err) {
            console.log(err);
        }
    },

    getDetailExperience: (req, res) => {
        const id_worker = String(req.params.id);
        selectExperienceByWorker(id_worker)
          .then((result) => {
            // client.setEx(`product/${id}`,60*60,JSON.stringify(result.rows))
            commonHelper.response(res, result.rows, 200, "get data success")
          })
          .catch((err) => res.send(err));
      },

      createExperience: async (req, res) => {
        const { position, company_name, work_start, work_end, description, id_worker } = req.body;
        const id_exp = uuidv4();
        const data = {
            id_exp,
            position,
            company_name,
            work_start,
            work_end,
            description,
            id_worker
        };
        insertExperience(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 201, "Experience created")
          )
          .catch((err) => res.send(err));
      },

      updateExperience: async (req, res) => {
        try {
          const id_exp = String(req.params.id)
          const { position, company_name, work_start, work_end, description, id_worker } = req.body;
          const { rowCount } = await findId(id_exp);
          if (!rowCount) {
            res.json({ message: "ID is Not Found" });
          }
          const data = {
            id_exp,
            position,
            company_name,
            work_start,
            work_end,
            description,
            id_worker
          };
          updateExperience(data)
            .then((result) =>
              commonHelper.response(res, result.rows, 201, "Experience updated")
            )
            .catch((err) => res.send(err));
        } catch (error) {
          console.log(error);
        }
      },

      deleteExperience: async (req, res) => {
        try {
          const id_exp = String(req.params.id);
          const { rowCount } = await findId(id_exp);
          if (!rowCount) {
            res.json({ message: "ID is Not Found" });
          }
          deleteExperience(id_exp)
            .then((result) =>
              commonHelper.response(res, result.rows, 201, "Experience deleted")
            )
            .catch((err) => res.send(err));
        } catch (error) {
          console.log(error);
        }
      },
}

module.exports = experienceController;