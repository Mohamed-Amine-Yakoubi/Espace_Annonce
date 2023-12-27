const { Timestamp } = require("mongodb");

const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const categorieshema = new Shema({
  Cat_Name: {
    type: String,
    required: [true, "categorie name required"],

  } ,
  Cat_Picture: {
    type: [String],
    required: [true, "Product pircture required"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to the User model
    required: true,
  },
});
const categorie = mongoose.model("category", categorieshema, "category");

module.exports = categorie;
