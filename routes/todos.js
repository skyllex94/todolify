const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const mwAuth = require("../middleware/mwAuth");
const TodoSchema = require("../schemas/TodoSchema");
const User = require("../schemas/UserSchema");

// @route   TODOS /userr
// @desc    Fetch all todos for the authorized user
// @access  Private
router.post("/"),
  async (req, res) => {
    // Validate request and check if it returns errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const updatedTodos = {
        user: user.id,
        categories: req.body.categories,
      };

      const todos = await updatedTodos.save();
      res.json(todos);
    } catch (error) {
      console.log(error.message);
    }
  };

module.exports = router;
