const express = require("express");
const route = express.Router();
const CategorieControllers = require("../../Controllers/Products/Categorie_controller");

route.post("/addCategory", CategorieControllers.CreateCategories);
route.get("/getAllCategories", CategorieControllers.GetCategories);
route.get("/getcategory/:id", CategorieControllers.GetCategory);
route.put("/updateCategory/:id", CategorieControllers.UpdateCategory);
route.delete("/deletecategory/:id", CategorieControllers.DeleteCategory);

module.exports = route;
