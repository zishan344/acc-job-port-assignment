const mongoose = require("mongoose");
const validator = require("validator");
// const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const hiringManager = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please type the name"],
      maxLength: [100, "name to large"],
      minLength: [3, "name to small"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "position must be required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "location must be required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description must be required"],
      trim: true,
    },
    contactNumber: {
      type: String,
      uniq: true,
      required: [true, "contact number must be required"],
      validate: [validator.isMobilePhone, "your contact Number not validate"],
    },
    email: {
      type: String,
      uniq: true,
      required: [true, "email must be required"],
      validate: [validator.isEmail, "email is not validate"],
    },
    job: {
      name: { type: String, required: true },

      id: {
        type: ObjectId,
        ref: "JobPost",
        required: true,
      },
    },
    confirmationTokenExpires: Date,
  },
  { timeStamps: true }
);
hiringManager.methods.generateExpiresDate = function () {
  const date = new Date();
  date.setDate(date.getDate() + 8);
  this.confirmationTokenExpires = date;
  return confirmationTokenExpires;
};
const PostHiringManager = mongoose.model("hiringManager", hiringManager);
module.exports = PostHiringManager;
