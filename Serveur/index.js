const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const CategorieRouter = require("./Route/Products/Categorie_Route");
const ProductsRouter = require("./Route/Products/Products_Route");
const UserRouter = require("./Route/User/User_Route");
const db = require("./Config/db");
const app = express();
const port = 3000;
const ApiError = require("./Utils/ApiError");
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
/************************/
app.use("/project_announcement", CategorieRouter);
app.use("/project_announcement", ProductsRouter);
app.use("/project_announcement", UserRouter);

app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this route :${req.originalUrl}`, 400));
});
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res
    .status(400)
    .json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
});
/************************/
app.listen(port, (req, res) => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
