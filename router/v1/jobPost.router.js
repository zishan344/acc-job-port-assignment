const express = require("express");
const router = express.Router();
const jobs = require("../../controller/jobPost.controller");
router.route("/jobs").post(jobs.createNewJob);
router.route("/jobs/:id").patch(jobs.updateJobWithId);
router.route("/manager/jobs").get(jobs.getAllJob);
router.route("/manager/jobs/:id").get(jobs.getSingleJobWithId);

module.exports = router;
