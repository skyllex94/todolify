const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const mwAuth = require("../middleware/mwAuth");
const Todos = require("../schemas/TodoSchema");
const User = require("../schemas/UserSchema");

// @route   GET TODOS /userr
// @desc    Fetch all todos for the authorized user
// @access  Private
router.get("/:id", mwAuth, async (req, res) => {
  // Validate request and check if it returns errors
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  try {
    // Fetch the userTodoList by finding the user_id in the Todo Collection
    const userTodoList = await Todos.findOne({ user_id: req.params.id });
    // res.send(userTodoList);

    const populateCategories = userTodoList.categories;

    res.send(populateCategories);
    // const fetchTodoList = {
    //   user: user.id,
    //   categories: req.body.categories,
    // };
    // console.log(updatedTodos);

    // const todos = await updatedTodos.save();
    // res.json(todos);
  } catch (error) {
    console.log("Error in fetching TodoList...");
  }
});

module.exports = router;
