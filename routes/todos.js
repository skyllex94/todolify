const mongoose = require("mongoose");
const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const mwAuth = require("../middleware/mwAuth");
const Todos = require("../schemas/TodoSchema");

// @route   GET TODOS /user/:id
// @desc    Fetch all todos for the authorized user
// @access  Private
router.get("/:id", async (req, res) => {
  try {
    // Fetch the userTodoList by finding the user_id in the Todo Collection
    // const userTodoList = await Todos.findOne({ user_id: req.params.id });

    // const populateCategories = userTodoList.categories;
    // res.send(populateCategories);

    const userTodoList = await Todos.findOne({ user_id: req.params.id });

    const date = userTodoList.date;
    const categories = userTodoList.categories;
    res.send({ date, categories });
  } catch (error) {
    console.log("Error in fetching TodoList...");
  }
});

// @route   POST /user/date/:id
// @desc    Add date to DB, if it doesn't exist
// @access  Private
router.post("/date/:id", async (req, res) => {
  const user_id = req.params.id;
  const month_year = req.body.month_year;
  const day = req.body.day;

  // Check if date exist in DB
  // const findDate = await Todos.find({
  //   user_id: user_id,
  //   "date.month_year": month_year,
  //   "date.days.day": day,
  // });

  // Fetch the todo list of user
  const userTodoList = await Todos.findOne({ user_id: req.params.id });
  const categories = userTodoList.categories;

  // Find index of month of curr request
  let monthIdx = userTodoList.date.findIndex(
    (curr) => curr.month_year === month_year
  );

  // If month doesn't exist
  if (monthIdx < 0) {
    // Create the new month object

    const newMonth = {
      month_year,
      days: [{ day, categories }],
    };

    // Mongoose query for inserting the new month
    await Todos.updateOne({ user_id }, { $set: { date: newMonth } });

    // Modify with newly created month index
    monthIdx = userTodoList.date.findIndex(
      (curr) => curr.month_year === month_year
    );
  }

  let dayIdx = userTodoList.date[monthIdx].days.findIndex(
    (curr) => curr.day == day
  );

  // If day doesn't exist
  if (dayIdx < 0) {
    const newDay = { day, categories };
    userTodoList.date[monthIdx].days.push(newDay);
    await userTodoList.save();

    dayIdx = userTodoList.date[monthIdx].days.findIndex(
      (curr) => curr.day == day
    );

    res.send(userTodoList);
  }
  console.log("categories:", categories);

  // If the month and day are present, or created continue
  userTodoList.date[monthIdx].days[dayIdx].categories.push({
    category: "newCategory",
    tasks: [
      {
        task: "Amili",
        done: false,
      },
    ],
  });
  await userTodoList.save();

  res.send(userTodoList);
});

// @route   POST /user/:id
// @desc    Add category to an auth user
// @access  Private
router.post("/:id", async (req, res) => {
  // Find the todo list of the logged user
  const userTodoList = await Todos.findOne({ user_id: req.params.id });
  const activeFrom = req.body.activeFrom;
  const activeUntil = req.body.activeUntil;
  const timeDuration = req.body.timeDuration;
  const day = req.body.day;
  const month_year = req.body.month_year;
  const category = req.body.category;
  const dayWtData = req.body.dayWtData;

  if (!userTodoList || !day || !month_year)
    res.send("Vital information missing");

  const newCategory = {
    category,
    icon: 0,
    activeFrom,
    activeUntil,
    timeDuration,
    tasks: [],
  };

  try {
    let arrLength = 0;
    let category_id;
    let monthIdx, dayIdx;

    // If there is data for this day, do this query
    if (dayWtData) {
      monthIdx = userTodoList.date.findIndex(
        (curr) => curr.month_year === month_year
      );

      dayIdx = userTodoList.date[monthIdx].days.findIndex(
        (curr) => curr.day === day
      );

      arrLength =
        userTodoList.date[monthIdx].days[dayIdx].categories.push(newCategory);

      category_id =
        userTodoList.date[monthIdx].days[dayIdx].categories[
          arrLength - 1
        ]._id.valueOf();
    }
    // Else add new category to the categories obj, to be populated for other empty days
    else {
      // Push the new category to the current array of categories / returns length of the array
      arrLength = userTodoList.categories.push(newCategory);
      // Fetch category id from newly created DB obj
      category_id = userTodoList.categories[arrLength - 1]._id.valueOf();
    }

    // Send new category to MongoDB and store it
    await userTodoList.save();
    // Return the whole state from DB in order to replace it in redux
    // res.send(userTodoList)

    // Alternatively - return obj with all the info needed
    const insertedCategory = {
      info: {
        dayWtData,
        monthIdx,
        dayIdx,
      },

      categoryObj: {
        _id: category_id,
        category,
        icon: 0,
        activeFrom,
        activeUntil,
        timeDuration,
        tasks: [],
      },
    };

    // Return a response with the whole updated userTodoList from DB
    res.send(userTodoList);
  } catch (err) {
    res.send(err.message);
  }
});

function getCategoryIdx(ctgryId, dayIdx, monthIdx, userTodoList) {
  try {
    const categoryIdx = userTodoList.date[monthIdx].days[
      dayIdx
    ].categories.findIndex((curr) => curr._id.valueOf() === ctgryId);

    if (categoryIdx < 0) return null;
    return categoryIdx;
  } catch (err) {
    return err.message;
  }
}

// @route   POST /user/:id/category_id
// @desc    Add task to a certain category to an auth user
// @access  Private
router.post("/:id/:category_id", async (req, res) => {
  const dayWtData = req.body.dayWtData;
  const day = req.body.day;
  const month_year = req.body.month_year;
  const category_id = req.params.category_id;
  const default_category_idx = req.body.category_index;
  console.log("category_id:", category_id);

  const userTodoList = await getUserTodoList(req.params.id);

  const newTask = {
    task: req.body.task,
    done: false,
  };

  const dayMonthIdxObj = getDayMonthIdx(day, month_year, userTodoList);
  const { dayIdx, monthIdx } = dayMonthIdxObj;
  console.log("monthIdx:", monthIdx);

  if (dayWtData) {
    // Find the index of the Category in which to input the task comparing ids
    const categoryIdx = getCategoryIdx(
      category_id,
      dayIdx,
      monthIdx,
      userTodoList
    );

    if (categoryIdx) {
      // Push the new task to the existing array of task for the correct category / returned array length
      userTodoList.date[monthIdx].days[dayIdx].categories[
        categoryIdx
      ].tasks.push(newTask);
      // Save the new task to MongoDB
      await userTodoList.save();
    }

    // // Fetch the newly created task_id from the DB
    // const task_id =
    //   userTodoList.categories[categoryIndex].tasks[taskToDBList - 1]._id;

    // // Return the object wt all info to update UI
    // const taskToBeReturned = {
    //   newTaskObj: {
    //     _id: task_id.valueOf(),
    //     task: req.body.task,
    //     done: false,
    //   },
    //   categoryIndex,
    // };
  } else {
    console.log("Create a new task for an empty day - that will be exciting");

    const categories = userTodoList.categories;

    console.log("default_category_idx:", default_category_idx);

    categories[default_category_idx].tasks.push(newTask);
    // console.log("defaultCategories:", defaultCategories);

    // New day structure including the fetched default categories
    const newDay = { day, categories };
    console.log("newDay:", newDay);

    // TODO: Check if there is a month that matches the month of the current day, go through months wt a map
    // TODO: Do so for the day as well - maybe

    // Find the monthIdx and why it's undefined
    console.log("[monthIdx]:", monthIdx);

    const updatedTodoList = userTodoList.date[monthIdx].days.push(newDay);

    console.log("updatedTodoList:", updatedTodoList);
    await userTodoList.save();
  }

  res.send(userTodoList);
});

// @route   PATCH /api/user/:user_id
// @desc    TOGGLE a task's checkbox and persist it
// @access  Private
router.patch("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const categoryIndex = req.body.category_index;
  const taskIndex = req.body.task_index;
  const updatedToggle = req.body.done;

  // Creating the key for the update
  const keyValue =
    "categories." + categoryIndex + ".tasks." + taskIndex + ".done";

  // Mongoose query for finding the task and toggling the 'done' value
  const updateToggleTask = await Todos.updateOne(
    { user_id },
    { $set: { [keyValue]: updatedToggle } }
  );

  const toggleTaskObj = {
    confirmation: updateToggleTask,
    objInfo: {
      categoryIndex,
      taskIndex,
      updatedToggle,
    },
  };

  // Send back resp of whether the query call was successful
  res.send(toggleTaskObj);
});

// @route   PATCH /api/user/upd-ctry/:user_id
// @desc    UPDATE a category
// @access  Private
router.patch("/upd-ctry/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const categoryIndex = req.body.category_index;
  const newValue = req.body.value;

  // Creating the key for the update
  const keyValue = "categories." + categoryIndex + ".category";

  // Mongoose query for finding the category and updating its value
  const updateCategoryQuery = await Todos.updateOne(
    { user_id },
    { $set: { [keyValue]: newValue } }
  );

  const updatedCategoryObj = {
    confirmation: updateCategoryQuery,
    objInfo: { categoryIndex, newValue },
  };

  // Send back resp wt query call and object info
  res.send(updatedCategoryObj);
});

// @route   PATCH /api/user/upd-ctry-icon
// @desc    UPDATE a category icon
// @access  Private
router.patch("/upd-ctry-icon/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const categoryIndex = req.body.category_index;
  const newIconIdx = req.body.iconIdx;

  // Creating the key for the update
  const keyValue = "categories." + categoryIndex + ".icon";
  if (keyValue === null) {
    return;
  }
  // Mongoose query for finding the category and updating its value
  const updateIcon = await Todos.updateOne(
    { user_id },
    { $set: { [keyValue]: newIconIdx } }
  );

  const updatedCategoryObj = {
    confirmation: updateIcon,
    objInfo: { categoryIndex, newIconIdx },
  };
  // Send back resp wt query call and object info
  res.send(updatedCategoryObj);
});

// @route   PATCH /api/user/upd-task/:user_id
// @desc    UPDATE a task
// @access  Private
router.patch("/upd-task/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const categoryIndex = req.body.category_index;
  const taskIndex = req.body.task_index;
  const newValue = req.body.value;

  // Creating the key for the update
  const keyValue =
    "categories." + categoryIndex + ".tasks." + taskIndex + ".task";

  // Mongoose query for finding the task and updating its value
  const updateToggleTask = await Todos.updateOne(
    { user_id },
    { $set: { [keyValue]: newValue } }
  );

  const updatedTaskObj = {
    confirmation: updateToggleTask,
    objInfo: {
      categoryIndex,
      taskIndex,
      newValue,
    },
  };

  // Send back resp of whether the query call was successful
  res.send(updatedTaskObj);
});

// Helper functions
async function getUserTodoList(user_id) {
  if (!user_id) return null;

  try {
    return await Todos.findOne({ user_id });
  } catch (err) {
    return err.message;
  }
}

function getDayMonthIdx(day, month_year, fetchedTodoList) {
  if (!fetchedTodoList) return "No userTodoList passed";

  let monthIdx, dayIdx;

  try {
    if (month_year) {
      monthIdx = fetchedTodoList.date.findIndex(
        (curr) => curr.month_year === month_year
      );
      if (monthIdx < 0) return "No month found in DB";
    }
  } catch (err) {
    return err.message;
  }

  try {
    if (day) {
      dayIdx = fetchedTodoList.date[monthIdx].days.findIndex(
        (curr) => curr.day == day
      );
      if (dayIdx < 0) return "No day found in DB";
    }
  } catch (err) {
    return err.message;
  }

  return { dayIdx, monthIdx };
}

// @route   DELETE /api/user/:user_id/:category_id
// @desc    DELETE category from a day in an auth user
// @access  Private
router.delete("/:id/:category_id", async (req, res) => {
  // Define the user_id and category_id and prep them for the DB query
  const user_id = mongoose.Types.ObjectId(req.params.id);
  const categoryToDelete = mongoose.Types.ObjectId(req.params.category_id);

  const dayWtData = req.body.dayWtData;
  const day = req.body.day;
  const month_year = req.body.month_year;
  let queryKey;
  const userTodoList = await getUserTodoList(user_id);

  if (dayWtData) {
    const dayMonthIdxObj = getDayMonthIdx(day, month_year, userTodoList);
    const { dayIdx, monthIdx } = dayMonthIdxObj;

    queryKey = "date." + monthIdx + ".days." + dayIdx + ".categories";
  } else {
    queryKey = "categories";
  }

  const updatedTodoList = await Todos.findOneAndUpdate(
    { user_id },
    {
      $pull: {
        [queryKey]: {
          _id: categoryToDelete,
        },
      },
    },
    // Mongoose Option to return the new updated collection
    // Use {returnNewDocument: true} for MongoDB
    { new: true }
  );

  // Return back dayWtData, category_id OR alternatively the whole new document
  res.send({ dayWtData, categoryToDelete, updatedTodoList });

  // Find user_id, and remove the selected category by id
  // await userTodoList.updateOne(
  //   { user_id },
  //   {
  //     $pull: {
  //       [queryKey]: {
  //         _id: categoryToDelete,
  //       },
  //     },
  //   }
  // );
});

// @route   DELETE /api/user/:user_id/:category_index/:id
// @desc    DELETE task from a category
// @access  Private
router.delete("/:user_id/:category_id/:id", async (req, res) => {
  // Define the user_id and category_id and prep them for the DB query
  const user_id = mongoose.Types.ObjectId(req.params.user_id);
  const taskToDelete = mongoose.Types.ObjectId(req.params.id);

  // Finding the user's todo list object
  const userTodoList = await Todos.findOne({ user_id });

  // Finding the index of the category where the task is located
  const categoryIndex = userTodoList.categories.findIndex(
    (curr) => curr._id.valueOf() === req.params.category_id
  );

  // Concatenate the key before the query, so there's no errors when creating it
  const keyValue = "categories." + categoryIndex + ".tasks";

  // Query and pull out the task by its id
  const deletedTask = await Todos.updateOne(
    { user_id },
    {
      $pull: {
        [keyValue]: {
          _id: taskToDelete,
        },
      },
    }
  );

  // Return back the deleted task's id
  res.send({
    taskToDeleteId: taskToDelete,
    category_id: req.params.category_id,
  });
});

module.exports = router;
