const mongoose = require("mongoose");
const categorie = require("./Categorie_model");
const Schema = mongoose.Schema;

const Product_Shema = new Schema({
 
  Product_Name: {
    type: String,
    required: [true, "Product name required"],
  },
  Product_Description: {
    type:String,
    required: [true, "Product description required"],
  },
  Product_Price: {
    type: String,
    required: [true, "Product Price required"],
  },
  Product_Picture: {
    type: [String],
    required: [true, "Product pircture required"],
  },
  Product_Category:{
    type:mongoose.Schema.ObjectId,
    ref:categorie,
    required:[true,"product must be belong to category"]
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'users', // Reference to the User model
    required: true,
  }
},{
  timestamps:true,
});

const Products=mongoose.model("Products",Product_Shema);

module.exports=Products;
