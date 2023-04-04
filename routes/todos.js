const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const mwAuth = require("../middleware/mwAuth");
const Todos = require("../schemas/TodoSchema");
const { getDayIdx } = require("./helper_funcs");
const axios = require("axios");

const push = require("web-push");

// @route   POST Subscribe a service worker
// @desc    Subscribe a service worker and receive a subscription object with created endpoint
// @access  Private
router.post("/subscribe", async (req, res) => {
  try {
    const publicVapidKey =
      "BFt1wp7hs6lZu_zeV59YpHaBKADr4mQal6pYJz-PqkIJM-ybL8nWaeTSfDpQAivuYx65cvyQ1o33uW3rJYSbfYs";

    push.setVapidDetails(
      "mailto:test@test.com",
      publicVapidKey,
      process.env.VAPID_PRIVATE_KEY
    );

    // Get push subscription object
    console.log(
      "publicVapidKey:",
      publicVapidKey,
      "privateKey:",
      process.env.VAPID_PRIVATE_KEY
    );

    console.log("Here I am");
    const request = req;
    console.log("request:", request);

    const { stringified_subscription } = req.body;
    console.log("subscription:", stringified_subscription);

    // Send 201 Status
    res.status(201).json({});
    // const payload = JSON.stringify({ title: "Push Test" });

    // Pass object into sendNotification
    push
      .sendNotification(stringified_subscription, "test message")
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
  }
});

// @route   GET TODOS /user/:id
// @desc    Fetch all todos for the authorized user
// @access  Private
router.get("/:id", async (req, res) => {
  try {
    // Fetch the userTodoList by finding the user_id in the Todo Collection
    const userTodoList = await Todos.findOne({ user_id: req.params.id });

    if (!userTodoList)
      return res.send({ error: "Could not find user todo list" });

    // Returning them as objects to fetch whicheven one you need for the different fields
    res.send({
      date: userTodoList.date,
      categories: userTodoList.categories,
      goals: userTodoList.goals,
    });
  } catch (error) {
    console.log("Error while fetching TodoList...");
  }
});

router.post("/verify_recaptcha", async (req, res) => {
  const { token } = req.body;
  console.log("token:", token);

  const google_auth_res = await axios.post(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      secret: process.env.GOOGLE_RECAPTCHA_SECRET,
      response: token,
    },
    {
      // Content-Type should the google auth type
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  console.log("google_auth_res:", google_auth_res);
  if (!google_auth_res) return { error: "Could not verify reCaptcha" };

  const { data } = google_auth_res;
  if (data.success === false) res.send({ verificationResult: false });
  res.send({ verificationResult: true });
});

// @route   POST /user/date/:id
// @desc    Add date to DB, if it doesn't exist
// @access  Private
router.post("/date/:id", async (req, res) => {
  const user_id = req.params.id;
  const month_year = req.body.month_year;
  const day = req.body.day;

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

function getCtgryIdx(ctgryId, dayIdx, monthIdx, userTodoList) {
  try {
    const categoryIdx = userTodoList.date[monthIdx].days[
      dayIdx
    ].categories.findIndex((curr) => curr._id.valueOf() === ctgryId);

    console.log("categoryIdx:", categoryIdx);

    if (categoryIdx < 0) return null;
    return categoryIdx;
  } catch (err) {
    return null;
  }
}

// @route   POST /user/:id/category_id
// @desc    Add task to a certain category to an auth user
// @access  Private
router.post("/:id/:category_id", async (req, res) => {
  const { id, category_id } = req.params;
  const { day, dayWtData, month_year, default_category_idx } = req.body;

  const userTodoList = await getUserTodoList(id);

  const newTask = {
    task: req.body.task,
    done: false,
  };

  let monthIdx = getMonthIdx(month_year, userTodoList);
  // Use monthIdx === null, since !monthIdx will return error for index 0
  if (monthIdx === null) return res.send("User data missing");

  // Create the new month_year
  if (monthIdx === "No month found in DB") {
    const newMonthYear = { month_year, days: [] };
    const arrLength = userTodoList.date.push(newMonthYear);
    const newlyCreatedMonth = userTodoList.date[arrLength - 1];
    monthIdx = userTodoList.date.indexOf(newlyCreatedMonth);

    await userTodoList.save();
  }

  // IF - Already having the categories array, add the task to it
  if (dayWtData) {
    const dayIdx = getDayIdx(day, monthIdx, userTodoList);
    // Day index checks
    if (dayIdx === null) return res.send({ error: "User data not found" });
    if (dayIdx === "No day found in DB") return res.send({ error: dayIdx });

    // Find category index in which to input the task comparing ids
    const ctgry_Idx = getCtgryIdx(category_id, dayIdx, monthIdx, userTodoList);

    if (ctgry_Idx === null)
      return res.send({ error: "Category index not found" });

    // Push the new task to the existing array
    userTodoList.date[monthIdx].days[dayIdx].categories[ctgry_Idx].tasks.push(
      newTask
    );
    // Save the new task to MongoDB
    userTodoList.save();
    return res.send({ userTodoList });
  }

  // Use parse and strigify in order to make a full copy of the array wt objects
  // If trying to spread, it won't work, because it only creates a shallow copy only
  const categories = JSON.parse(JSON.stringify(userTodoList.categories));
  categories[default_category_idx].tasks.push(newTask);

  // IF - there's "events" object for the day, add the "categories" to it
  const dayIdx = getDayIdx(day, monthIdx, userTodoList);

  if (userTodoList.date[monthIdx]?.days[dayIdx]?.events) {
    // Push the category to this same object
    categories.map((curr) =>
      userTodoList.date[monthIdx].days[dayIdx].categories.push(curr)
    );
    userTodoList.save();
    return res.send({ userTodoList });
  }

  // IF - No categories or events arrays, create a new day
  const newDay = { day, categories };
  userTodoList.date[monthIdx].days.push(newDay);

  userTodoList.save();
  res.send({ userTodoList });
});

async function getDayAndMonthIdx(day, month_year, user_id) {
  const userTodoList = await Todos.findOne({ user_id });

  const monthIdx = getMonthIdx(month_year, userTodoList);
  if (!idxIsValid(monthIdx, "month"))
    return res.send({ error: "Error why fetching monthIdx" });

  const dayIdx = getDayIdx(day, monthIdx, userTodoList);
  if (!idxIsValid(dayIdx, "day"))
    return res.send({ error: "Error why fetching dayIdx" });

  return { dayIdx, monthIdx, userTodoList };
}

// @route   PATCH /api/user/:user_id
// @desc    TOGGLE a task in a category
// @access  Private
router.patch("/toggle_task", async (req, res) => {
  const user_id = req.body.user_id;
  const categoryIdx = req.body.category_index;
  const day = req.body.day;
  const month_year = req.body.month_year;
  const taskIdx = req.body.task_index;
  const updatedToggle = req.body.done;

  const fetchedIndexes = await getDayAndMonthIdx(day, month_year, user_id);
  if (fetchedIndexes.error) return res.send({ error: fetchedIndexes.error });

  const { dayIdx, monthIdx } = fetchedIndexes;

  // Creating the key for the update
  const key =
    "date." +
    monthIdx +
    ".days." +
    dayIdx +
    ".categories." +
    categoryIdx +
    ".tasks." +
    taskIdx +
    ".done";

  // Mongoose query for finding the task and toggling the 'done' value
  const updatedTodoList = await Todos.findOneAndUpdate(
    { user_id },
    { $set: { [key]: updatedToggle } },
    { new: true }
  );

  // Send back resp of whether the query call was successful
  res.send({ userTodoList: updatedTodoList });
});

// @route   PATCH /api/user/upd-ctry/:user_id
// @desc    UPDATE category name for a certain day
// @access  Private
router.patch("/upd-ctry/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const categoryIdx = req.body.category_index;
  const newName = req.body.new_name;
  const dayWtData = req.body.dayWtData;
  let key = null;

  const userTodoList = await Todos.findOne({ user_id });

  // If updating the name needs to happed to a day that has data
  if (dayWtData) {
    const day = req.body.day;
    const month_year = req.body.month_year;

    const monthIdx = getMonthIdx(month_year, userTodoList);
    if (!idxIsValid(monthIdx, "month"))
      return res.send({ error: "Error while retrieving monthIdx" });

    const dayIdx = getDayIdx(day, monthIdx, userTodoList);
    if (!idxIsValid(dayIdx, "day"))
      return res.send({ error: "Error while retrieving dayIdx" });

    key =
      "date." +
      monthIdx +
      ".days." +
      dayIdx +
      ".categories." +
      categoryIdx +
      ".category";
  }

  // Else update the default categories' name
  else {
    key = "categories." + categoryIdx + ".category";
  }

  if (key === null) res.send({ error: "Query key is missing" });

  // Mongoose query updating the category name and returning the updated document
  const updatedTodoList = await Todos.findOneAndUpdate(
    { user_id },
    { $set: { [key]: newName } },
    { new: true }
  );

  res.send({ userTodoList: updatedTodoList, error: null });
});

// @route   PATCH /api/user/upd-ctry-icon
// @desc    UPDATE a category icon
// @access  Private
router.patch("/upd-ctry-icon/", async (req, res) => {
  const user_id = req.body.user_id;
  const categoryIdx = req.body.category_index;
  const newIconIdx = req.body.iconIdx;
  const dayWtData = req.body.dayWtData;
  const dayIdx = req.body.dayIdx;
  const monthIdx = req.body.monthIdx;

  let key = null;
  if (dayWtData) {
    // Check if any of the idxes are null, using "=== null" since the values could be 0
    if (dayIdx === null || monthIdx === null)
      return { error: "Either monthIdx or dayIdx is not found for this date" };
    key =
      "date." +
      monthIdx +
      ".days." +
      dayIdx +
      ".categories." +
      categoryIdx +
      ".icon";
  } else {
    key = "categories." + categoryIdx + ".icon";
  }

  if (key === null) {
    return { error: "The key for the query could not be populated" };
  }
  // Mongoose query for finding the category and updating its value
  const updatedTodoList = await Todos.findOneAndUpdate(
    { user_id },
    { $set: { [key]: newIconIdx } },
    { new: true }
  );

  // console.log("updatedTodoList:", updatedTodoList);

  // Send back resp wt the updatedTodoList
  res.send({ userTodoList: updatedTodoList });
});

// @route   PATCH /api/user/rename-task/:user_id
// @desc    UPDATE the name of a task
// @access  Private
router.patch("/rename-task/", async (req, res) => {
  const user_id = req.body.user_id;
  const day = req.body.day;
  const month_year = req.body.month_year;
  const categoryIdx = req.body.category_index;
  const taskIdx = req.body.task_index;
  const newName = req.body.value;

  const userTodoList = await Todos.findOne({ user_id });
  if (userTodoList === null)
    return res.send({ error: "User Todolist could not be retrieved." });

  const monthIdx = getMonthIdx(month_year, userTodoList);

  if (!idxIsValid(monthIdx, "month"))
    return res.send({ error: "Error while fetching monthIdx" });

  const dayIdx = getDayIdx(day, monthIdx, userTodoList);
  if (!idxIsValid(dayIdx, "day"))
    return res.send({ error: "Error while fetching dayIdx" });

  // Creating the key for the update
  const key =
    "date." +
    monthIdx +
    ".days." +
    dayIdx +
    ".categories." +
    categoryIdx +
    ".tasks." +
    taskIdx +
    ".task";

  // Mongoose query for finding the task, updating & returning the updated document
  const updatedTodoList = await Todos.findOneAndUpdate(
    { user_id },
    { $set: { [key]: newName } },
    { new: true }
  );

  // Send back resp of the whole updated document
  res.send({ userTodoList: updatedTodoList });
});

// Helper functions
async function getUserTodoList(user_id) {
  if (!user_id) return null;

  try {
    return await Todos.findOne({ user_id });
  } catch (err) {
    return null;
  }
}

function isEmpty(fetchedTodoList) {
  if (fetchedTodoList) return false;
  return true;
}

function getMonthIdx(month_year, fetchedTodoList) {
  if (isEmpty(fetchedTodoList)) return null;

  try {
    if (month_year) {
      const monthIdx = fetchedTodoList.date.findIndex(
        (curr) => curr.month_year === month_year
      );
      if (monthIdx < 0) return "No month found in DB";
      return monthIdx;
    }
  } catch (err) {
    return null;
  }
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
    const monthIdx = getMonthIdx(month_year, userTodoList);
    if (monthIdx === "No month found in DB") {
      console.log("Error while deleting, monthIdx doesn't exist");
      return res.send({ dayWtData, categoryToDelete, userTodoList });
    }

    if (monthIdx === null) {
      console.log("Error while deleting month, userTodoList may be empty");
      return res.send({ dayWtData, categoryToDelete, userTodoList });
    }

    const dayIdx = getDayIdx(day, monthIdx, userTodoList);

    if (dayIdx === "No month found in DB") {
      console.log("Error while deleting, dayIdx doesn't exist");
      return res.send();
    }

    if (dayIdx === null) {
      console.log("Error while deleting day, userTodoList may be empty");
      return res.send({ dayWtData, categoryToDelete, userTodoList });
    }

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
});

function idxIsValid(idx, timePeriod) {
  if (idx === `No ${timePeriod} found in DB`) {
    const error = `Error while deleting, ${timePeriod}Idx doesn't exist`;
    return { isValid: false, error };
  }

  if (idx === null) {
    const error = `Error while deleting ${timePeriod}, userTodoList may be empty`;
    return { isValid: false, error };
  }

  return { isValid: true };
}

// @route   DELETE /api/user/:user_id/:category_index/:id
// @desc    DELETE task from a category in a day or default category if not data
// @access  Private
router.delete("/:user_id/:category_id/:id", async (req, res) => {
  // Define the user_id and category_id and prep them for the DB query
  const user_id = mongoose.Types.ObjectId(req.params.user_id);
  const taskToDelete = mongoose.Types.ObjectId(req.params.id);

  const day = req.body.day;
  const month_year = req.body.month_year;

  // Finding userTodolist object
  const userTodoList = await Todos.findOne({ user_id });

  // Try-out to do another abstraction with creating getValidMonthAndDayIdx()
  const monthIdx = userTodoList.date.findIndex(
    (curr) => curr.month_year === month_year
  );

  const monthIsValid = idxIsValid(monthIdx, "month");
  if (!monthIsValid.isValid)
    return res.send({ userTodoList, error: checkIfValid.error });

  const dayIdx = userTodoList.date[monthIdx].days.findIndex(
    (curr) => curr.day == day
  );

  const dayisValid = idxIsValid(dayIdx, "day");
  if (!dayisValid.isValid)
    return res.send({ userTodoList, error: checkIfValid.error });

  // Finding the index of the category where the task is located
  const categoryIdx = userTodoList.date[monthIdx].days[
    dayIdx
  ].categories.findIndex(
    (curr) => curr._id.valueOf() === req.params.category_id
  );
  console.log("categoryIdx:", categoryIdx);
  if (categoryIdx < 0)
    return res.send({
      userTodoList,
      error: "Category index could not be found when deleting the task",
    });

  // Concatenate the key before the query, so there's no errors when creating it
  const key =
    "date." +
    monthIdx +
    ".days." +
    dayIdx +
    ".categories." +
    categoryIdx +
    ".tasks";

  // Pull out the task and return the updated DB document
  const updatedUserTodoList = await Todos.findOneAndUpdate(
    { user_id },
    {
      $pull: {
        [key]: {
          _id: taskToDelete,
        },
      },
    },
    { new: true }
  );

  // Return the whole document
  res.send({ userTodoList: updatedUserTodoList, error: null });
});

module.exports = router;
