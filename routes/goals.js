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
  const year = req.body.year;
  const goal = req.body.goal;
  let user_goals_from_state = req.body.user_goals;

  // Start here: think about how you would go about doing this in a good and error safe manner

  const yearIdx = user_goals_from_state.findIndex((curr) => curr.year === year);

  user_goals_from_state = user_goals_from_state[yearIdx].list.push({
    goal,
    done: false,
  });
  //   user_goals_from_state.save();

  res.send(console.log(user_goals_from_state));

  //   const userData = await Todos.findOne({ user_id });
  //   if (!userData) return { error: "User data could not be fetched" };
  //   return res.send({ userData });
});

module.exports = router;
