const express = require("express")
const auth = require("../../middleware/auth");
const { userLogin, userRegister, changePassword, changeFullName} = require("./userFunctions")
const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.put("/change-password", [auth], changePassword)
userRouter.put("/change-full-name", [auth], changeFullName)

module.exports = userRouter;