const multer = require("multer");
const createError = require("http-errors");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB (max file size)
  },
  fileFilter: (req, file, cb) => {
    const extension = ["jpg", "jpeg", "png"];
    const fileExtension = file.mimetype.split("/")[1];
    if (extension.includes(fileExtension)) {
      return cb(null, true);
    } else {
      return cb(
        new createError(400, "File Picture format must PNG, JPG , or JPEG"),
        false
      );
    }
  },
});

module.exports = upload;