const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const jobSchema = mongoose.Schema(
  {
    jobName: {
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
    jobType: {
      type: String,
      required: [true, "jobType must be required"],
      trim: true,
    },
    salaryRange: {
      type: String,
      required: [true, "salaryRange must be required"],
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
  },
  { timeStamps: true }
);
const PostJob = mongoose.model("JobPost", jobSchema);
module.exports = PostJob;
