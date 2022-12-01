const { response } = require("express");
const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const mwAuth = require("../middleware/mwAuth");
const Todos = require("../schemas/TodoSchema");
const User = require("../schemas/UserSchema");

// @route   GET TODOS /user/:id
// @desc    Fetch all todos for the authorized user
// @access  Private
router.get("/:id", async (req, res) => {
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

    // const todos = await updatedTodos.save();
    // res.json(todos);
  } catch (error) {
    console.log("Error in fetching TodoList...");
  }
});

// @route   POST /user/:id
// @desc    Add category to an auth user
// @access  Private
router.post("/:id", async (req, res) => {
  // Find the todo list of the logged user
  const userTodoList = await Todos.findOne({ user_id: req.params.id });

  if (req.body.categoryId) {
    // const index = userTodoList.categories.findIndex(
    //   (curr) => curr._id === req.body.categoryId

    // );
    console.log("req.body.categoryId:", req.body.categoryId);

    const eer = userTodoList.categories.findIndex(
      (curr) => curr._id === "6388893bf1d4cfc44be08f7f"
    );
    console.log(eer);
    // console.log(userTodoList.categories[1]);
    const newTask = {
      task: req.body.task,
      done: false,
    };

    // userTodoList.categories[index].tasks.push(newTask)

    // userTodoList.categories.[category].push(newTask);
    // await userTodoList.categories.category.save(newTask);
  } else {
    // Create the object for the new category
    const newCategory = {
      category: req.body.category,
      tasks: [],
    };
    // Push the new category to the current array of categories
    userTodoList.categories.push(newCategory);
    // Send the new category to MongoDB and store it
    await userTodoList.save(newCategory);
  }
});

module.exports = router;
