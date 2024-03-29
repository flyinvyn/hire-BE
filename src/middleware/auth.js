const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const protect = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRETE_KEY_JWT);
      req.payload = decoded;
      next();
    } else {
      res.json({
        message: "server need token",
      });
    }
  } catch (error) {
    console.log(error);
    if (error && error.name === "JsonWebTokenError") {
      next(new createError(400, "Token invalid"));
    } else if (error && error.name === "TokenExpiredError") {
      next(new createError(400, "Token expired"));
    } else {
      next(new createError(400, "Token not active"));
    }
  }
};

const roleAdmin = (req,res,next) =>{
  if(req.payload.role === "seller"){
    next()
  }else{
    res.status(403).json({message:"Do not have acces"})
  }
}
module.exports = { protect ,roleAdmin };
