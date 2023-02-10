const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../schemas/UserSchema");

// @route   GET /api/settings/:user_id
// @desc    Fetch all of the user config data for the logged user
// @access  Private
router.get(
  "/:user_id",
  [
    // Type cheking each field on the back end
    check("user_id", "User ID is required").exists(),
  ],
  async (req, res) => {
    const user_id = req.params.user_id;

    const userConfig = await User.findOne({ user_id });

    if (!userConfig) return { error: "No user found" };
    res.send({ userConfig });
  }
);

// @route   POST /api/settings/change-name
// @desc    Rename the name of the user
// @access  Private
router.post("/change-name", async (req, res) => {
  const user_id = req.body.user_id;
  const new_name = req.body.new_name;

  const userConfig = await User.findOneAndUpdate(
    { user_id },
    { $set: { name: new_name } },
    { new: true }
  );

  if (!userConfig) return { error: "No user found" };

  res.send({ userConfig });
});

// @route   POST /api/settings/change-email
// @desc    Rename the email of a user
// @access  Private
router.post("/change-email", async (req, res) => {
  const user_id = req.body.user_id;
  const new_email = req.body.new_email;
  console.log("new_email:", new_email);

  const userConfig = await User.findOneAndUpdate(
    { user_id },
    { $set: { email: new_email } },
    { new: true }
  );

  if (!userConfig) return { error: "The query request could not be finished" };

  res.send({ userConfig });
});

// @route   POST /api/settings/change-pass
// @desc    Update user's password
// @access  Private
router.post(
  "/change-pass",
  [check("new_pass", "Password is required").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    // If there are errors, return a bad response wt error message
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_id, new_pass } = req.body;
    console.log("new_pass:", new_pass);

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const updated_pass = await bcrypt.hash(new_pass, salt);
    console.log("updated_pass:", updated_pass);

    const userConfig = await User.findOneAndUpdate(
      { user_id },
      { $set: { password: updated_pass } },
      { new: true }
    );

    if (!userConfig)
      return { error: "The query request could not be finished" };

    res.send({ userConfig });
  }
);

module.exports = router;
