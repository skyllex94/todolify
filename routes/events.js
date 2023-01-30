const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// Todos Model being used for storing the events
const Todos = require("../schemas/TodoSchema");
const { getMonthIdx, idxIsValid, getDayIdx } = require("./helper_funcs");

// @route   GET EVENTS /events/
// @desc    Fetch all user events for the current month
// @access  Private
router.get("/:id", async (req, res) => {
  console.log(req.params.user_id);
});

// @route   POST EVENT /events/add-event
// @desc    Add an event to a specific day
// @access  Private
router.post("/add-event/", async (req, res) => {
  const user_id = req.body.user_id;
  const event_name = req.body.event_name;
  const day = req.body.day;
  const month_year = req.body.month_year;

  // Make sure you await the fetching of the userTodoList
  const userTodoList = await getUserTodoList(user_id);
  if (!userTodoList) return res.send({ error: "No userTodoList found" });

  let newEvent = { event: event_name, done: false };

  // TODO: Check if day has events

  // If it doesn't
  const monthIdx = getMonthIdx(month_year, userTodoList);

  const validIdx = idxIsValid(monthIdx, "month");
  if (!validIdx) return res.send({ userTodoList, error: validIdx.error });

  const dayIdx = getDayIdx(day, monthIdx, userTodoList);
  const validDayIdx = idxIsValid(dayIdx, "day");
  if (!validDayIdx) return res.send({ userTodoList, error: validDayIdx.error });

  // Add-in the events array structure
  const key = "date." + monthIdx + ".days." + dayIdx;

  newEvent = { events: [newEvent] };
  console.log("newEvent:", newEvent);

  const updatedTodoList = await Todos.findOneAndUpdate(
    { user_id },
    { $set: { [key]: newEvent } },
    { new: true }
  );

  res.send({ userTodoList: updatedTodoList });
});

async function getUserTodoList(user_id) {
  return await Todos.findOne({ user_id });
}

module.exports = router;
