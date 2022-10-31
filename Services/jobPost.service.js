const PostJob = require("../models/PostJob");

exports.createJob = async (data) => {
  const jobPost = await PostJob.create(data);
  return jobPost;
};
exports.updateJob = async (id, data) => {
  const updateJob = await PostJob.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return updateJob;
};
exports.getJobs = async () => {
  const getallJobs = await PostJob.find({});
  return getallJobs;
};
exports.getSingleJob = async (id) => {
  const getJob = await PostJob.findOne({ _id: id });
  return getJob;
};
