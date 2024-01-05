
const mongoose=require("mongoose");
 
const dotenv=require("dotenv");
dotenv.config({path:'.env'});
const database_url="mongodb://127.0.0.1:27017/announcement_project_local";
// const database_url=process.env.DB_URL;
// DB_PASSWORD=announcement01234
// DB_USER=announcement_project
 
mongoose.connect(database_url).then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
  });