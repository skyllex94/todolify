const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../schemas/UserSchema");
const Todos = require("../schemas/TodoSchema");

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
    console.log("user_id:", user_id);

    const userConfig = await User.findOne({ _id: user_id });

    if (!userConfig) return { error: "No user found" };
    res.send({ userConfig });
  }
);

// @route   POST /api/settings/change-name
// @desc    Rename the name of the user
// @access  Private
router.post("/change-name", async (req, res) => {
  const { user_id, new_name } = req.body;

  const userConfig = await User.findOneAndUpdate(
    { _id: user_id },
    { $set: { name: new_name } },
    { new: true }
  );

  if (!userConfig) return { error: "No user found" };

  res.send({ userConfig });
});

// @route   POST /api/settings/change-email
// @desc    Rename the email of a user
// @access  Private
router.post(
  "/change-email",
  [
    [
      // Email check from middleware
      check("email", "Please include a valid email").isEmail(),
    ],
  ],
  async (req, res) => {
    const { user_id, new_email } = req.body;

    // Check if new_email already exists in DB
    let user = await User.findOne({ new_email });
    if (user)
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });

    const userConfig = await User.findOneAndUpdate(
      { _id: user_id },
      { $set: { email: new_email } },
      { new: true }
    );

    if (!userConfig)
      return { error: "The query request could not be finished" };

    res.send({ userConfig });
  }
);

// @route   POST /api/settings/change-pass
// @desc    Update user's password
// @access  Private
router.post("/change-pass", async (req, res) => {
  const errors = validationResult(req);
  // If there are errors, return a bad response wt error message
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user_id, new_pass } = req.body;

  // Encrypt password
  const salt = await bcrypt.genSalt(10);
  const updated_pass = await bcrypt.hash(new_pass, salt);

  // Make sure the user_id does not change when updating password
  const userConfig = await User.findOneAndUpdate(
    { _id: user_id },
    { $set: { _id: user_id, password: updated_pass } },
    { new: true }
  );

  if (!userConfig) return { error: "The query request could not be finished" };

  res.send({ userConfig });
});

// @route   DELETE /api/settings/delete-user
// @desc    Permenantly delete user
// @access  Private
router.delete("/delete-user", async (req, res) => {
  const { user_id } = req.body;
  let removedUser = false;
  let removedUserTodos = false;

  try {
    const deletedUser = await User.deleteOne({ _id: user_id });
    const { acknowledged, deleteCount } = deletedUser;
    if (acknowledged && deleteCount > 0) removedUser = true;
  } catch (error) {
    return res.send({ error });
  }

  try {
    const deletedTodos = await Todos.deleteOne({ _id: user_id });
    const { acknowledged, deleteCount } = deletedTodos;
    if (acknowledged && deleteCount > 0) removedUserTodos = true;
  } catch (error) {
    return res.send({ error });
  }

  res.send({ permanentlyDeleted: true });
});

module.exports = router;
