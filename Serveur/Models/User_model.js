const mongoose = require("mongoose");
const Shema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserShema = new Shema({
  User_name: { type: String, required: [true, "required"] },
  User_firstname: { type: String, required: [true, "required"] },
  User_email: { type: String, required: [true, "required"], unique: true },
  User_password: { type: String, required: [true, "required"] },
  User_phone: { type: String, required: [true, "required"] },
  role: {
    type: String,
    enum: ['client', 'admin'], // Define possible roles
    default: 'client',
  },
});

// Hash the password before saving
UserShema.pre("save", async function (next) {
  try {
    if (!this.isModified("User_password")) {
      return next();
    }

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(this.User_password, 10);
    this.User_password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
 
let User = mongoose.model("users", UserShema, "users");

module.exports = User;
