const mongoose = require("mongoose");
const categorie = require("./Categorie_model");
const Schema = mongoose.Schema;
const moment = require('moment');
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
  Product_Location: {
    type: String,
    required: [true, "Product location required"],
  },
  Product_Date: {
    type: Date,
    default: Date.now, 
    required: [true, "Product Date required"],
   get: (val) => moment(val).format('YYYY-MM-DD'),
  
  },
  Product_Picture: {
    type: [String],
    required: [true, "Product pircture required"],
  },
  Product_Category:{
    type:mongoose.Schema.ObjectId,
    ref:'categorie',
    required:[true,"product must be belong to category"]
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'users', // Reference to the User model
    required: true,
  }
  ,state:{
    type:String,
    enum: ['pending', 'approved', 'rejected'],
    default:"pending",
  }
},{
  timestamps:true,
});
// Set the date format using moment.js before saving
Product_Shema.pre('save', function (next) {
  this.Product_Date = moment(this.Product_Date).format("YYYY-MM-DD");
  next();
});
const Products=mongoose.model("Products",Product_Shema);

module.exports=Products;
