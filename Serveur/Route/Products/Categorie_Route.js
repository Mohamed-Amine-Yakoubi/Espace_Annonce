const express = require("express");
const route = express.Router();
const CategorieControllers = require("../../Controllers/Products/Categorie_controller");
const middleware=require("../../Middleware/auth.js");
const {param}=require("express-validator");
const PictureMiddle = require("../../Middleware/PicturesMiddle.js");
route.post("/addCategory",middleware.Protect,middleware.isAdmin, PictureMiddle.array('Cat_Picture',5), CategorieControllers.CreateCategories);
route.get("/getAllCategories", CategorieControllers.GetCategories);
route.get("/getcategory/:id", CategorieControllers.GetCategory);
route.put("/updateCategory/:id",middleware.Protect,middleware.isAdmin, CategorieControllers.UpdateCategory);
route.delete("/deletecategory/:id", CategorieControllers.DeleteCategory);

module.exports = route;
