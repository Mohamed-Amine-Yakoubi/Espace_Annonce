const User = require("../../Models/User_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const privatekey = process.env.PRIVATE_KEY;
const asyncHandler = require("express-async-handler");

/****************function jwt ****************** */

const createToken = (payload) => {
  return jwt.sign({ id: payload }, privatekey, { expiresIn: "90d" });
};
/********************************* */
exports.SignUp = asyncHandler(async (req, res) => {
  try {
    const { User_name, User_firstname, User_email, User_password, User_phone } =
      req.body;
    if (
      !User_name ||
      !User_firstname ||
      !User_email ||
      !User_password ||
      !User_phone
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ User_email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user_save = new User({
      User_name,
      User_firstname,
      User_email,
      User_password,
      User_phone,
    });
    let token = createToken(user_save._id);
    const user = await user_save.save();

    if (user) {
      res.status(201).cookie("token", token).json({
        message: "User registered successfully",
        user,
        token,
      });
    } else {
      res.status(400).json({ message: "User registered failed" });
    }
  } catch (error) {
    res.status(400).json({ error: "User registered failed" });
  }
});
/***********************SignIn****************************** */
exports.SingIn = asyncHandler(async (req, res) => {
  const { User_email, User_password } = req.body;
  if (!User_email && !User_password) {
    return res.status(400).json({ message: "Missing required fields" });
  } else {
    const user = await User.findOne({ User_email });

    if (!user || !(await bcrypt.compare(User_password, user.User_password))) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }
    let token = createToken(user._id);
    return res
      .status(200)
      .cookie("token", token)
      .json({ message: "user found successfully", user, token });
  }
});
/***********************get all users****************************** */
exports.GetAllUser = asyncHandler(async (req, res) => {
  try {
    const getalluser = await User.find({ role: "client" });
    if (getalluser) {
      res.status(200).json({ message: "all users ", data: getalluser });
    }
  } catch (error) {
    res.status(400).json({ error: "get all users failed" });
  }
});
/***********************get  user by id****************************** */
exports.GetUserById = asyncHandler(async (req, res) => {
  const {id}=req.params;
  try {
    const getuserbyid = await User.find({  _id:id });
    if (getuserbyid) {
      res.status(200).json({ message: "user with id ", data: getuserbyid });
    }
  } catch (error) {
    res.status(400).json({ error: "get user failed" });
  }
});

/***********************delete all users****************************** */
exports.DeleteUsers = asyncHandler(async (req, res) => {
  try {
    const deleteusers = await User.deleteMany({ role: "client" });
    if (deleteusers) {
      res
        .status(200)
        .json({ message: "all users have been successfully deleted" });
    }
    return (deleteusers);
  } catch (error) {
    res.status(400).json({ error: "Users delete failed" });
  }
});
/***********************delete specific users****************************** */
exports.DeleteSpecificUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletespecificuser = await User.findOneAndDelete({ _id: id });
    if (deletespecificuser) {
      res
        .status(200)
        .json({ message: "your specific user have been successfully deleted" });
    } else {
      res.status(200).json({ message: "user doesn't exist" });
    }
    return deletespecificuser;
  } catch (error) {
    res.status(400).json({ error: "User delete failed" });
  }
});
