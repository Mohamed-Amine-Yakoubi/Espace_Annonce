const Products_Model = require("../../Models/Product_model");
const jwt = require("jsonwebtoken");
const path=require("path");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const privatekey = process.env.PRIVATE_KEY;

// Function to generate JWT token
const createToken = (payload) => {
  return jwt.sign({ id: payload }, privatekey, { expiresIn: "90d" });
};
//Create products/
exports.Create_Products =   asyncHandler(async (req, res) => {
 
 
  try {
    const userId = req.user._id;

    const {
      Product_Name,
      Product_Description,
      Product_Price,
  
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
      Product_Picture:productPictures ,
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
/**************Get specific product************* */
exports.Get_spec_Product = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const get_spec_product = await Products_Model.findById(id);
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
  const { Product_Name, Product_Description, Product_Price, Product_Picture } =
    req.body;
  const updateFields = {
    Product_Name: Product_Name,
    Product_Description: Product_Description,
    Product_Price: Product_Price,
    Product_Picture: Product_Picture,
  };
  const update_spec_product = await Products_Model.findOneAndUpdate(
    { _id: id },
    updateFields,
    { new: true }
  );
  if (update_spec_product) {
    res.status(201).json({
      message: "your product have been successfully updated",
      data: update_spec_product,
    });
  } else {
    res.status(400).json({ message: "your product have not been found" });
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