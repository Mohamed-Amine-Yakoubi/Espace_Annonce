const { Timestamp } = require('mongodb');
 
const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const categorieshema = new Shema(
  {
    Cat_Name: {
      type: String,
      required: [true, "categorie name required"],
      unique: [true, "categorie must be unique"],
    },
    Slug: {
      type: String,
      lowercase: true,
    },
    image:String,
  } 
);
const categorie = mongoose.model("category", categorieshema,"category");

module.exports = categorie;
