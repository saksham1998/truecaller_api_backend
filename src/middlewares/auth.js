const User = require("../../db/models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: {
        id: data.id,
        token: token,
      },
    });
    if (!user) {
      throw new Error("Please Authenticate before accessing this route");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
      res.status(404).send({messsage:'Please Authenticate before accessing this route',user:null})
  }
};

module.exports = auth;
