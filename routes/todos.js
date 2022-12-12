const { response } = require("express");
const mongoose = require("mongoose");
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

// @route   DELETE /user/:id
// @desc    DELETE category in an auth user
// @access  Private
router.delete("/:id/:item_id", async (req, res) => {
  // Define the user_id and category_id and prep them for the DB query
  const userId = mongoose.Types.ObjectId(req.params.id);
  const categoryToDelete = mongoose.Types.ObjectId(req.params.item_id);

  // DB query for finding matching user_id, going in the categories and removing the selected category by id
  const deleteCategory = await Todos.updateOne(
    {
      user_id: userId,
    },
    {
      $pull: {
        categories: {
          _id: categoryToDelete,
        },
      },
    }
  );
  console.log(deleteCategory);
  // Return back the id of the category removed
  res.send(req.params.item_id);

  // Additional included tryouts
  // const selectedCategory = await Todos.findById("639696a51c46586c25b44bde");

  // const deleteCategory = await Todos.deleteOne({
  //   "categories._id": userId,
  // });

  // const categoryIndex = userTodoList.categories.findIndex(
  //   (curr) => curr._id.valueOf() === req.params.item_id
  // );

  // const deleteCategoryFromDB = await Todos.deleteOne({
  //   category: "newlyINPUTED",
  // });

  // Works on deleting the entire document
  // const resp = await Todos.findByIdAndDelete("637f9337db5851a564a0b001");

  // const show = await Todos.find({ user_id: req.params.id });

  // const id = req.params.item_id.toString();
});

// @route   POST /user/:id
// @desc    Add category to an auth user
// @access  Private
router.post("/:id", async (req, res) => {
  // Find the todo list of the logged user
  const userTodoList = await Todos.findOne({ user_id: req.params.id });

  let resp;
  // If task inputted in any category, it will trigger this part
  // if (req.body.categoryId) {
  //   // Find the index of the Category in which to input the task comparing ids
  //   const categoryIndex = userTodoList.categories.findIndex(
  //     (curr) => curr._id.valueOf() === req.body.categoryId
  //   );
  //   // The new task object with it info inside, id is auto-generated
  //   const newTask = {
  //     task: req.body.task,
  //     done: false,
  //   };

  //   // Push the new task to the existing array of task for the correct category / returned array length
  //   const taskToDBList =
  //     userTodoList.categories[categoryIndex].tasks.push(newTask);
  //   // Send the new task to MongoDB
  //   await userTodoList.save(taskToDBList);
  //   // Fetch the newly created task_id from the DB
  //   const task_id =
  //     userTodoList.categories[categoryIndex].tasks[taskToDBList - 1]._id;
  //   // console.log(payload, task_id.valueOf());
  //   // Return the object wt all info to update UI
  //   const taskToBeReturned = {
  //     task_id: task_id.valueOf(),
  //     task: req.body.task,
  //     done: false,
  //   };
  //   console.log(taskToBeReturned);
  //   resp = taskToBeReturned;
  // }
  // If category added it will trigger the else
  // else {
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
  // }

  res.send(resp);
});

// @route   POST /user/:id/category_id
// @desc    Add task to a certain category to an auth user
// @access  Private
router.post("/:id/:category_id", async (req, res) => {
  const userTodoList = await Todos.findOne({ user_id: req.params.id });

  // The new task object with it info inside, id is auto-generated
  const newTask = {
    task: req.body.task,
    done: false,
  };

  // Find the index of the Category in which to input the task comparing ids
  const categoryIndex = userTodoList.categories.findIndex(
    (curr) => curr._id.valueOf() === req.params.category_id
  );

  console.log("req.params.category_id:", req.params.category_id);

  // Push the new task to the existing array of task for the correct category / returned array length
  const taskToDBList =
    userTodoList.categories[categoryIndex].tasks.push(newTask);
  // Send the new task to MongoDB
  await userTodoList.save(taskToDBList);

  // Fetch the newly created task_id from the DB
  const task_id =
    userTodoList.categories[categoryIndex].tasks[taskToDBList - 1]._id;

  // Return the object wt all info to update UI
  const taskToBeReturned = {
    task_id: task_id.valueOf(),
    task: req.body.task,
    done: false,
  };
  console.log(taskToBeReturned);

  res.send(taskToBeReturned);
});

module.exports = router;
