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

  // If task inputted in any category, it will trigger this part
  if (req.body.categoryId) {
    // Find the index of the Category in which to input the task comparing ids
    const categoryIndex = userTodoList.categories.findIndex(
      (curr) => curr._id.valueOf() === req.body.categoryId
    );
    // The new task object with it info inside, id is auto-generated
    const newTask = {
      task: req.body.task,
      done: false,
    };

    // Push the new task to the existing array of task for the correct category
    const taskToDB = userTodoList.categories[categoryIndex].tasks.push(newTask);
    // Send the new task to MongoDB
    await userTodoList.save(taskToDB);
  }
  // If category added it will trigger the else
  else {
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
