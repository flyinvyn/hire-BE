const {
    selectAllPortofolio,
    selectPortofolioByWorker,
    insertPortofolio,
    updatePortofolio,
    deletePortofolio,
    countPortofolio,
    findId
} = require('../models/portofilio')
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require('../middleware/cloudinary')


const portofolioController = {
    getAllPortofolio: async (req, res) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 100;
            const offset = (page - 1) * limit;
            const sortby = req.query.sortby || "apk_name";
            const sort = req.query.sort || "ASC";
            let result = await selectAllPortofolio({ limit, offset, sort, sortby });
            const {
                rows: [count],
            } = await countPortofolio();
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
                "Get Data portofolio Success",
                pagination
            );
        } catch (err) {
            console.log(err)
        }
    },

    getDetailPortofolio: (req, res) => {
        const id_worker = String(req.params.id);
        selectPortofolioByWorker(id_worker)
            .then((result) => {
                // client.setEx(`product/${id}`,60*60,JSON.stringify(result.rows))
                commonHelper.response(res, result.rows, 200, "get data success")
            })
            .catch((err) => res.send(err));
    },

    createPortofolio: async (req, res) => {
        const { apk_name, link_repo, type, id_worker } = req.body;
        const id_porto = uuidv4();
        let photo = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            photo = result.secure_url;
        }
        const data = {
            id_porto,
            apk_name,
            link_repo,
            type,
            photo,
            id_worker
        };
        insertPortofolio(data)
            .then((result) =>
                commonHelper.response(res, result.rows, 201, "Portofolio created")
            )
            .catch((err) => res.send(err));
    },

    updatePortofolio: async (req, res) => {
        try {
            const id_porto = String(req.params.id)
            const { apk_name, link_repo, type, id_worker } = req.body;
            const { rowCount } = await findId(id_porto);
            if (!rowCount) {
                res.json({ message: "ID is Not Found" });
            }
            let photo = null;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                photo = result.secure_url;
            }
            const data = {
                id_porto,
                apk_name,
                link_repo,
                type,
                photo,
                id_worker
            };
            updatePortofolio(data)
                .then((result) =>
                    commonHelper.response(res, result.rows, 201, "Portofolio updated")
                )
                .catch((err) => res.send(err));
        } catch (error) {
            console.log(error);
        }
    },

    deletePortofolio: async (req, res) => {
        try {
            const id_porto = String(req.params.id);
            const { rowCount } = await findId(id_porto);
            if (!rowCount) {
                res.json({ message: "ID is Not Found" });
            }
            deletePortofolio(id_porto)
                .then((result) =>
                    commonHelper.response(res, result.rows, 201, "Portofolio deleted")
                )
                .catch((err) => res.send(err));
        } catch (error) {
            console.log(error);
        }
    },
}

module.exports = portofolioController;