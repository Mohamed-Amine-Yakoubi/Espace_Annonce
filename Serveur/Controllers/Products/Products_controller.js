const Products_Model = require("../../Models/Product_model");
const jwt = require("jsonwebtoken");
const path = require("path");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const privatekey = process.env.PRIVATE_KEY;

// Function to generate JWT token
const createToken = (payload) => {
  return jwt.sign({ id: payload }, privatekey, { expiresIn: "90d" });
};
//Create products/
exports.Create_Products = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      Product_Name,
      Product_Description,
      Product_Price,
      Product_Location,

      Product_Category,
    } = req.body;
    let productPictures = [];

    // Check if it's a single file or an array of files
    if (req.files) {
      productPictures = req.files.map((file) => file.path);
    } else if (req.file) {
      productPictures.push(req.file.path);
    }

    const Products = await Products_Model.create({
      Product_Name,
      Product_Description,
      Product_Price,
      Product_Location,
      Product_Picture: productPictures,
      Product_Category,
      createdBy: userId,
    });

    if (Products) {
      const token = createToken(userId);
      res.header("Authorization", `Bearer ${token}`);
      res.status(201).json({
        message: "Product has been added successfully",
        data: Products,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Product could not be added" });
  }
});

/**************Get products************* */
exports.Get_Products = asyncHandler(async (req, res) => {
  const get_products = await Products_Model.find({});
  if (get_products) {
    res.status(201).json({
      message: "your products have been successfully found",
      data: get_products,
    });
  } else {
    res.status(400).json({ message: "your products have not been found" });
  }
});
/**************Get products with specific category************* */
exports.Get_Category_Products = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;
  const get_category_products = await Products_Model.find({
    Product_Category: categoryId,
  });
  if (get_category_products) {
    res.status(201).json({
      message: "your products have been successfully found",
      data: get_category_products,
    });
  } else {
    res.status(400).json({ message: "your products have not been found" });
  }
});
/**************Get specific product by id user************* */
exports.Get_spec_ProductByIdUser = asyncHandler(async (req, res) => {
  const { createdId } = req.params;
  const productbyiduser = await Products_Model.find({ createdBy: createdId });
  if (productbyiduser) {
    res.status(201).json({
      message: "your product have been successfully found",
      data: productbyiduser,
    });
  } else {
    res.status(400).json({ message: "your product have not been found" });
  }
});
/**************Get specific product************* */
exports.Get_spec_Product = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const get_spec_product = await Products_Model.findById({ _id: id });
  if (get_spec_product) {
    res.status(201).json({
      message: "your product have been successfully found",
      data: get_spec_product,
    });
  } else {
    res.status(400).json({ message: "your product have not been found" });
  }
});

/**************Update specific product************* */
exports.Update_spec_Product = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    Product_Name,
    Product_Description,
    Product_Price,
    Product_Location,
    Product_Category,
    createdBy,
  } = req.body;

  let productPictures = [];

  if (req.files) {
    productPictures = req.files.map((file) => file.path);
  } else if (req.file) {
    productPictures.push(req.file.path);
  }

  const updateFields = {
    Product_Name,
    Product_Description,
    Product_Price,
    Product_Location,
    Product_Category,
    Product_Picture: productPictures,
  };

  try {
    const updatedProduct = await Products_Model.findOneAndUpdate(
      { _id: id },
      updateFields,
      { new: true }
    );

    if (updatedProduct) {
      const token = createToken(createdBy);
      res.header("Authorization", `Bearer ${token}`);
      res.status(201).json({
        message: "Your product has been successfully updated",
        data: updatedProduct,
      });
    } else {
      res.status(404).json({ message: `Product with ID ${id} not found` });
    }
  } catch (error) {
    // Handle database or other errors
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

/**************Delete specific product************* */
exports.Delete_spec_Product = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const delete_spec_product = await Products_Model.findOneAndDelete({
    _id: id,
  });
  if (delete_spec_product) {
    res.status(201).json({
      message: "your product have been successfully deleted",
      data: delete_spec_product,
    });
  } else {
    res.status(400).json({ message: "your product have not been found" });
  }
});
/**************Get user product************* */
exports.Get_User_Product = asyncHandler(async (req, res) => {
  const { createdBy } = req.params; // Change from req.body to req.query

  const get_user_product = await Products_Model.find({ createdBy: createdBy });

  if (get_user_product.length > 0) {
    res.status(201).json({
      message: "your product have been successfully found",
      data: get_user_product,
    });
  } else {
    res.status(400).json({ message: "your product have not been found" });
  }
});

/**************Delete specific product************* */
exports.Delete_All_Product = asyncHandler(async (req, res) => {
  const delete_all_product = await Products_Model.deleteMany({});
  if (delete_all_product) {
    res.status(201).json({
      message: "all products have been successfully deleted",
      data: delete_all_product,
    });
  } else {
    res.status(400).json({ message: " products have not been found" });
  }
});
/**************Update state specific product************* */
exports.Update_State_Product = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { state } = req.body;

  const updateFields = {
    state: state,
  };

  try {
    const updatedstateProduct = await Products_Model.findOneAndUpdate(
      { _id: id },
      updateFields,
      { new: true }
    );

    if (updatedstateProduct) {
      const token = createToken(userId);
      res.header("Authorization", `Bearer ${token}`);
      res.status(201).json({
        message: "Your product has been successfully updated",
        data: updatedstateProduct,
      });
    } else {
      res.status(404).json({ message: `Product with ID ${id} not found` });
    }
  } catch (error) {
    // Handle database or other errors
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});
