import User from "../model/userModel.js";
import bcrypt from "bcrypt";

const verifyPassword = async (req, res, next) => {
  try {
    // GET USER DATA
    const { oldPassword, email } = req.body;

    // FIND USER
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }
    // MATCH PASSWORD
    const userPassword = user.password;
    const matchPassword = await bcrypt.compare(oldPassword, userPassword);

    // RES TO CLIENT
    if (!matchPassword) {
      return res.status(400).json({
        status: "fail",
        message: "wrong password",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

export default verifyPassword;
