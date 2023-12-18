const slugify = require("slugify");
const Categorie_Model = require("../../Models/Categorie_model");
const asyncHandler = require("express-async-handler");
/**************************** */

exports.CreateCategories = asyncHandler(async (req, res) => {
  const Cat_Name = req.body.CatName;

  const category = await Categorie_Model.create({
    Cat_Name,
    slug: slugify(Cat_Name),
  });
  res.status(201).json({       message: "Category has been added successfully",data: category });
});

/****************get categories*************** */
exports.GetCategories = asyncHandler(async (req, res) => {
  const categories = await Categorie_Model.find({});
  res.status(201).json({   data: categories });
});
/*************get specific category*************/
exports.GetCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Categorie_Model.findById(id);
  if (category) {
    res.status(201).json({ data: category });
  } else {
    res.status(400).json({ message: "no category for this id" });
  }
});

/*************update specific category*************/
exports.UpdateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { Cat_Name } = req.body;
  const category = await Categorie_Model.findOneAndUpdate(
    { _id: id },
    { Cat_Name },
    { new: true }
  );
  if (category) {
    res.status(201).json({ data: category });
  } else {
    res.status(400).json({ message: "no category for this id" });
  }
});
/*************delete specific category*************/
exports.DeleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Categorie_Model.findOneAndDelete(
    { _id: id },
    { new: true }
  );
  if (category) {
    res
      .status(201)
      .json({ message: "category has been deleted", data: category });
  } else {
    res.status(400).json({ message: "no category for this id" });
  }
});
