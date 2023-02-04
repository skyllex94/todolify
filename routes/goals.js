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
