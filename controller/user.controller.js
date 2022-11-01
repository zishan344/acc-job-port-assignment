const bcrypt = require("bcryptjs");
const {
  createUser,
  findUserByEmail,
  deleteUser,
  findUserByToken,
} = require("../Services/user.service");

const { generateToken } = require("../utils/token");
exports.createNewUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    const token = user.generateConfirmationToken();
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      message: "successfully create user",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ status: "fail", error: "please provide your credentials" });
    }
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found please create an account",
      });
    }
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return res
        .status(403)
        .json({ status: "failed", message: "Invalid password" });
    }
    if (user.status !== "active") {
      return res
        .status(403)
        .json({ status: "fail", error: "Your account is not an active" });
    }

    const token = await generateToken(user);
    const { password: pwt, ...others } = user.toObject();
    res.status(200).json({
      status: "success",
      message: "successfully Login user",
      data: {
        others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
};
exports.getMe = async (req, res) => {
  try {
    // console.log(req.email);
    const user = await findUserByEmail(req.user.email);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found please create an account",
      });
    }
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "couldn't get the data",
      error: error.message,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteU = await deleteUser(id);
    res.status(200).json({
      status: "success",
      message: "deleteUser successfully",
      data: deleteU,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};
