const express = require("express");
const route = express.Router();
const Products_Controllers = require("../../Controllers/Products/Products_controller");
const authenticate = require('../../Controllers/User/User_controller');
const middleware=require("../../Middleware/auth")
const {param}=require("express-validator");
const PictureMiddle = require("../../Middleware/PicturesMiddle.js");

route.post("/AddProducts",middleware.Protect, PictureMiddle.array('Product_Picture', 5),  Products_Controllers.Create_Products);
route.get("/GetAllProducts", Products_Controllers.Get_Products);
route.get("/get_specProductById/:id",(param('id').isMongoId().withMessage("invalid category id")) ,Products_Controllers.Get_spec_Product);
route.get("/get_specProductByCategory/:categoryId",Products_Controllers.Get_Category_Products);
route.put("/UpdateProduct/:id", Products_Controllers.Update_spec_Product);
route.delete("/DeleteProduct/:id",middleware.Protect, Products_Controllers.Delete_spec_Product);
route.delete("/DeleteAllProduct",middleware.Protect, Products_Controllers.Delete_All_Product);

module.exports = route;