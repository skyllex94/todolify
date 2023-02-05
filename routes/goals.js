const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// @route   GET YEARLY GOALS /api/goals/:user_id
// @desc    Fetch all user yearly goal
// @access  Private
router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const userData = await Todos.findOne({ user_id });
  if (!userData) return { error: "User data could not be fetched" };

  return res.send({ userData });
});

// @route   ADD YEARLY GOAL /api/goals/add-goal
// @desc    Add a yearly goal to the current year
// @access  Private
router.post("/add-goal", async (req, res) => {
  const user_id = req.body.user_id;
  const year_idx = req.body.year_idx;
  const goal = req.body.goal;

  const key = "goals." + year_idx + ".list";

  const updatedData = await Todos.findOneAndUpdate(
    { user_id },
    { $push: { [key]: { goal, done: false } } },
    { new: true }
  );

  res.send({ userData: updatedData });
});

// @route   POST NEW YEAR /api/goals/add-year
// @desc    Add a new year to the goals array
// @access  Private
router.post("/add-year", async (req, res) => {
  const user_id = req.body.user_id;
  const new_year = req.body.new_year;
  const local_data = req.body.local_data;

  if (!user_id || !new_year || !local_data)
    return res.send({
      error: "Missing essential values for query",
      userData: local_data,
    });

  const new_year_obj = { year: new_year, list: [] };

  const userData = await Todos.findOneAndUpdate(
    { user_id },
    { $push: { goals: new_year_obj } },
    { new: true }
  );

  res.send({ userData });
});

// @route   PATCH TOGGLE GOAL /api/goals/toggle-goal
// @desc    Rename a yearly goal from the current year
// @access  Private
router.patch("/toggle-goal", async (req, res) => {
  const user_id = req.body.user_id;
  const year_idx = req.body.year_idx;
  const goal_idx = req.body.goal_idx;
  const updated_toggle = req.body.updated_toggle;

  if (user_id === null) return res.send({ error: "Essential values missing" });

  const key = "goals." + year_idx + ".list." + goal_idx + ".done";

  const userData = await Todos.findOneAndUpdate(
    { user_id },
    { $set: { [key]: updated_toggle } },
    { new: true }
  );

  res.send({ userData });
});

// @route   PATCH YEARLY GOAL /api/goals/rename-goal
// @desc    Rename a yearly goal from the current year
// @access  Private
router.patch("/rename-goal", async (req, res) => {
  const user_id = req.body.user_id;
  const year_idx = req.body.year_idx;
  const goal_idx = req.body.goal_idx;
  const renamed_goal = req.body.renamed_goal;
  const local_data = req.body.local_data;

  if (user_id === null || year_idx === null || renamed_goal === null)
    return res.send({
      userData: local_data,
      error: "Essential values missing",
    });

  const key = "goals." + year_idx + ".list." + goal_idx + ".goal";

  const updatedData = await Todos.findOneAndUpdate(
    { user_id },
    { $set: { [key]: renamed_goal } },
    { new: true }
  );

  res.send({ userData: updatedData });
});

// @route   REMOVE YEAR /api/goals/remove-year
// @desc    Remove a yearly goal from the current year
// @access  Private
router.delete("/remove-year", async (req, res) => {
  const user_id = req.body.user_id;
  const year_id = req.body.year_id;
  const local_data = req.body.local_data;

  if (user_id === null || year_id === null || local_data === null)
    return res.send({
      userData: local_data,
      error: "Essential values missing",
    });

  const userData = await Todos.findOneAndUpdate(
    { user_id },
    { $pull: { goals: { _id: year_id } } },
    { new: true }
  );

  res.send({ userData });
});

// @route   REMOVE YEARLY GOAL /api/goals/remove-goal
// @desc    Remove a yearly goal from the current year
// @access  Private
router.delete("/remove-goal", async (req, res) => {
  const user_id = req.body.user_id;
  const year_idx = req.body.year_idx;
  const goal_id = req.body.goal_id;
  const local_data = req.body.local_data;

  if (user_id === null || year_idx === null || goal_id === null)
    // Fetch the localData, so that if there is an error,
    // you can return back the old state - unit tested
    return res.send({
      userData: local_data,
      error: "Essential values missing",
    });

  const key = "goals." + year_idx + ".list";

  const updatedData = await Todos.findOneAndUpdate(
    { user_id },
    { $pull: { [key]: { _id: goal_id } } },
    { new: true }
  );

  res.send({ userData: updatedData });
});

module.exports = router;
