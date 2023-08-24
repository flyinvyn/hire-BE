const {
    selectAllSkill,
    selectSkill,
    selectSkillByWorker,
    insertSkill,
    updateSkill,
    deleteSkill,
    countSkill,
    findId,
    searchSkill
} = require('../models/skils')
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");


const skillController = {
    getAllSkill: async (req, res) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 100;
            const offset = (page - 1) * limit;
            const sortby = req.query.sortby || "name";
            const sort = req.query.sort || "ASC";
            let result = await selectAllSkill({ limit, offset, sort, sortby });
            const {
                rows: [count],
            } = await countSkill();
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
                "Get Data skil Success",
                pagination
            );
        } catch (err) {
            console.log(err);
        }
    },

    getDetailSkill: (req, res) => {
        const id_worker = String(req.params.id);
        selectSkillByWorker(id_worker)
          .then((result) => {
            // client.setEx(`product/${id}`,60*60,JSON.stringify(result.rows))
            commonHelper.response(res, result.rows, 200, "get data success")
          })
          .catch((err) => res.send(err));
      },

      createSkill: async (req, res) => {
        const { skill_name, id_worker } = req.body;
        const id_skill = uuidv4();
        const data = {
            id_skill,
            skill_name,
            id_worker
        };
        insertSkill(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 201, "Skill created")
          )
          .catch((err) => res.send(err));
      },

      updateSkill: async (req, res) => {
        try {
          const id_skill = String(req.params.id)
          const { skill_name, id_worker } = req.body;
          const { rowCount } = await findId(id_skill);
          if (!rowCount) {
            res.json({ message: "ID is Not Found" });
          }
          const data = {
            id_skill,
            skill_name,
            id_worker,
          };
          updateSkill(data)
            .then((result) =>
              commonHelper.response(res, result.rows, 200, "Worker updated")
            )
            .catch((err) => res.send(err));
        } catch (error) {
          console.log(error);
        }
      },

      deleteSkill: async (req, res) => {
        try {
          const id_skill = String(req.params.id);
          const { rowCount } = await findId(id_skill);
          if (!rowCount) {
            res.json({ message: "ID is Not Found" });
          }
          deleteSkill(id_skill)
            .then((result) =>
              commonHelper.response(res, result.rows, 201, "skill deleted")
            )
            .catch((err) => res.send(err));
        } catch (error) {
          console.log(error);
        }
      },
}

module.exports = skillController;