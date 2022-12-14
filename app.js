const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jobPost = require("./router/v1/jobPost.router");
const user = require("./router/v1/user.router");
//middleware
app.use(express.json());
app.use(cors());
// schema design
app.use("/api/v1", jobPost);
app.use("/api/v1/user", user);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
