const express = require("express");
const route = express.Router();
const UserControllers = require("../../Controllers/User/User_controller");
const middleware=require("../../Middleware/auth");
route.post("/SignUp", UserControllers.SignUp);
route.post("/SignIn", UserControllers.SingIn);
route.get("/GetAllUsers",middleware.Protect,middleware.isAdmin, UserControllers.GetAllUser);
route.get("/GetUserById/:id", UserControllers.GetUserById);
route.delete("/DeleteAllUsers",middleware.Protect,middleware.isAdmin, UserControllers.DeleteUsers);
route.delete("/DeleteSpecificUsers/:id",middleware.Protect,middleware.isAdmin, UserControllers.DeleteSpecificUser);
module.exports = route;
