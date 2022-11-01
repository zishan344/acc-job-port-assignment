const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email address is  required"],
      validate: [validator.isEmail, "provide a valid email"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      validate: (value) => {
        validator.isStrongPassword(value, {
          minLength: 6,
          minLowercase: 3,
          minUppercase: 1,
          minSymbol: 1,
        });
        message: "Password {Value is not  strong enough}";
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "password don't match",
      },
    },
    role: {
      type: String,
      enum: ["candidate", "Hiring Manager", "admin"],
      default: "candidate",
    },
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a first name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid contact number",
      ],
    },

    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "blocked"],
    },
    confirmationToken: String,
    confirmationTokenExpires: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);
/* userSchema.pre("save", async function (next) {
  const password = this.password;
  // const hashPassword = bcrypt.hashSync(password);
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});
userSchema.methods.comparePassword = function (password, hash) {
  const pass = password.toString();
  console.log(pass);
  const result = bcrypt.compareSync(pass, hash); // true;
  if (result) {
    console.log("Password correct");
  } else {
    console.log("Password wrong");
  }
  return true;
}; */
userSchema.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(64).toString("hex");
  this.confirmationToken = token;
  const date = new Date();
  date.setDate(date.getDate() + 1);
  this.confirmationTokenExpires = date;
  return token;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
