const express = require("express")
const { userLogin, userRegister, changePassword, changeFullName} = require("./userFunctions")
const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegister);
userRouter.put("/change-password", changePassword)
userRouter.put("/change-full-name", changeFullName)

module.exports = userRouter;