import express from "express";
import {
  changeUserPassword,
  confirmUserEmail,
  createAUser,
  getAllUser,
  getProfilePhoto,
  getUser,
  updateUserProfile,
  updateUserProfilePhoto,
  userLogIn,
} from "../controller/userController.js";
import verifyUser from "../utils/verifyUser.js";
import formidable from "express-formidable";
import verifyPassword from "../utils/verifyPassword.js";

const userRouter = express.Router();

// POST
userRouter.post("/signup", createAUser);
userRouter.post("/signin", userLogIn);

// GET
userRouter.get("/allUser", getAllUser);
userRouter.get("/getUser", verifyUser, getUser);
userRouter.get("/confirm/:token", confirmUserEmail);
userRouter.get("/photo/profile", getProfilePhoto);

// UPDATE
userRouter.put("/updateUser/photo", formidable(), updateUserProfilePhoto);
userRouter.patch('/password/change',verifyPassword, changeUserPassword)
userRouter.patch("/updateUser", updateUserProfile);

export default userRouter;
