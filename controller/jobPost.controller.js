const {
  createJob,
  getJobs,
  getSingleJob,
  updateJob,
} = require("../Services/jobPost.service");

exports.createNewJob = async (req, res) => {
  try {
    const result = await createJob(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully create data",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "couldn't create the new job",
      error: error.message,
    });
  }
};
exports.updateJobWithId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateJob(id, req.body);
    if (!result.modifiedCount) {
      return res
        .status(404)
        .json({ status: false, message: "Couldn't update data" });
    }
    res.status(200).json({
      status: "success",
      message: "successfully updated data",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "couldn't create the new job",
      error: error.message,
    });
  }
};
exports.getAllJob = async (req, res) => {
  try {
    const result = await getJobs(req.body);
    res.status(200).json({
      status: "success",
      message: "successfully getting data",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "couldn't get the data",
      error: error.message,
    });
  }
};
exports.getSingleJobWithId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getSingleJob(id);
    res.status(200).json({
      status: "success",
      message: "successfully getting data",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "couldn't get the data",
      error: error.message,
    });
  }
};
