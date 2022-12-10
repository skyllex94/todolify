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

    console.log(populateCategories);
    res.send(populateCategories);

    // const todos = await updatedTodos.save();
    // res.json(todos);
  } catch (error) {
    console.log("Error in fetching TodoList...");
  }
});

// @route   DELETE /user/:id
// @desc    DELETE category OR certain task in an auth user
// @access  Private
router.delete("/:id/:item_id", async (req, res) => {
  // Find the todos of the logged user
  const userTodoList = await Todos.findOne({ user_id: req.params.id });
  console.log(userTodoList.categories[137]);

  const categoryIndex = userTodoList.categories.findIndex(
    (curr) => curr._id.valueOf() === req.params.item_id
  );

  const id = req.params.item_id;
  const deleteCategoryFromDB = await Todos.deleteOne({
    category: "newlyINPUTED",
  });

  console.log(categoryIndex);
  console.log(deleteCategoryFromDB);
  res.send(deleteCategoryFromDB);
});

// @route   POST /user/:id
// @desc    Add category to an auth user
// @access  Private
router.post("/:id", async (req, res) => {
  // Find the todo list of the logged user
  const userTodoList = await Todos.findOne({ user_id: req.params.id });

  let resp;
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

    // Push the new task to the existing array of task for the correct category / returned array length
    const taskToDBList =
      userTodoList.categories[categoryIndex].tasks.push(newTask);
    // Send the new task to MongoDB
    await userTodoList.save(taskToDBList);
    // Fetch the newly created task_id from the DB
    const task_id =
      userTodoList.categories[categoryIndex].tasks[taskToDBList - 1]._id;
    // console.log(payload, task_id.valueOf());
    // Return the object wt all info to update UI
    const taskToBeReturned = {
      task_id: task_id.valueOf(),
      task: req.body.task,
      done: false,
    };
    // console.log(taskToBeReturned);
    resp = taskToBeReturned;
  }
  // If category added it will trigger the else
  else {
    // Create the object for the new category
    const newCategory = {
      category: req.body.category,
      tasks: [],
    };
    // Push the new category to the current array of categories / returns length of the array
    const arrLength = userTodoList.categories.push(newCategory);
    // Send the new category to MongoDB and store it
    await userTodoList.save(newCategory);
    // Fetch category id from newly created DB obj
    const category_id = userTodoList.categories[arrLength - 1]._id.valueOf();
    console.log(category_id);
    const categoryToReturn = {
      category_id,
      category: req.body.category,
      tasks: [],
    };
    console.log(categoryToReturn);
    resp = categoryToReturn;
  }

  res.send(resp);
});

module.exports = router;
