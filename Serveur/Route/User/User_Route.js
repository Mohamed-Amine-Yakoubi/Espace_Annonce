const express = require("express");
const route = express.Router();
const UserControllers = require("../../Controllers/User/User_controller");

route.post("/SignUp", UserControllers.SignUp);
route.post("/SignIn", UserControllers.SingIn);
module.exports = route;
