const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// Todos Model being used for storing the events
const Todos = require("../schemas/TodoSchema");
const {
  getMonthIdx,
  idxIsValid,
  getDayIdx,
  getUserTodoList,
  getEventsDateIdx,
} = require("./helper_funcs");

// @route   GET EVENTS /api/events
// @desc    Fetch all user events for the current month
// @access  Private
router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  if (!user_id) return res.send({ error: "No user ID found" });

  const userTodoList = await getUserTodoList(user_id);
  if (!userTodoList)
    return res.send({ error: "No todo user list with events found" });
  res.send({ userTodoList });
});

// @route   POST EVENT /api/events/add-event
// @desc    Add an event to a specific day
// @access  Private
router.post("/add-event", async (req, res) => {
  const user_id = req.body.user_id;
  const event_name = req.body.event_name;
  const day = req.body.day;
  const month_year = req.body.month_year;
  const notes = req.body.notes;

  // Make sure you await the fetching of the userTodoList
  const userTodoList = await getUserTodoList(user_id);
  if (!userTodoList) return res.send({ error: "No user todo list found" });

  let newEvent = { event: event_name, done: false, notes };

  const monthIdx = getMonthIdx(month_year, userTodoList);
  // If there is no month, create a month and day and input the event in it
  if (monthIdx === "No month found in DB") {
    const newMonth = { month_year, days: [{ day, events: [newEvent] }] };
    userTodoList.date.push(newMonth);
    userTodoList.save();
    return res.send({ userTodoList });
  }

  const validIdx = idxIsValid(monthIdx, "month");
  if (!validIdx) return res.send({ error: validIdx.error });

  // If there is no day, create it and insert in with nothing in categories array
  const dayIdx = getDayIdx(day, monthIdx, userTodoList);
  if (dayIdx === "No day found in DB") {
    const newDay = { day, events: [newEvent] };
    userTodoList.date[monthIdx].days.push(newDay);
    userTodoList.save();
    return res.send({ userTodoList });
  }

  const validDayIdx = idxIsValid(dayIdx, "day");
  if (!validDayIdx) return res.send({ error: validDayIdx.error });

  userTodoList.date[monthIdx].days[dayIdx]?.events.push(newEvent);
  await userTodoList.save();

  res.send({ userTodoList });
});

// @route   DELETE EVENT /api/events/remove-event
// @desc    Remove an event from a specific day
// @access  Private
router.delete("/remove-event", async (req, res) => {
  const user_id = req.body.user_id;
  console.log("user_id:", user_id);

  const day_idx = req.body.day_idx;
  console.log("day_idx:", day_idx);

  const month_idx = req.body.month_idx;
  console.log("month_idxtypeof:", typeof month_idx);
  console.log("month_idx:", month_idx);

  const event_id = req.body.event_id;
  console.log("event_id:", event_id);

  const key = "date." + month_idx + ".days." + day_idx + ".events";
  console.log("key:", key);

  const updatedTodoList = await Todos.findOneAndUpdate(
    { user_id },
    { $pull: { [key]: { _id: event_id } } },
    { new: true }
  );

  console.log("updatedTodoList:", updatedTodoList);

  res.send({ userTodoList: updatedTodoList });
});

module.exports = router;
