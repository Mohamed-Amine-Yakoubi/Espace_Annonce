const slugify = require("slugify");
const Categorie_Model = require("../../Models/Categorie_model");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const privatekey = process.env.PRIVATE_KEY;
/**************************** */
// Function to generate JWT token
 
const createToken = (payload) => {
  return jwt.sign({ id: payload }, privatekey, { expiresIn: "90d" });
};
exports.CreateCategories = asyncHandler(async (req, res) => {
  const Cat_Name = req.body.Cat_Name;
  const id_user = req.user._id;
  let Cat_Picture = [];

  if (req.files) {
    Cat_Picture = req.files.map((file) => file.path);
  } else if (req.file) {
    Cat_Picture.push(req.file.path);
  }

  const category = await Categorie_Model.create({
    Cat_Name,
    Cat_Picture: Cat_Picture,
    createdBy: id_user,
  });
  if (category) {
    const token = createToken(id_user);
    res.header("Authorization", `Bearer ${token}`);
    res.status(201).json({
      message: "Category has been added successfully",
      data: category,
    });
  } else {
    res.status(400).json({
      message: "The category has not been added"
    });
  }
});

/****************get categories*************** */
exports.GetCategories = asyncHandler(async (req, res) => {
  const categories = await Categorie_Model.find({});
  if (categories) {
    res.status(201).json({
      message: "Category has been added successfully",
      data: categories,
    });
  }
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
