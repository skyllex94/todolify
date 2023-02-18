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
} = require("./helper_funcs");

// @route   GET EVENTS /api/events/user_id
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
  const { user_id, event_name, day, month_year, notes } = req.body;

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

// @route   PATCH TOGGLE EVENT /api/events/toggle-event
// @desc    Toggle an event from a specific day
// @access  Private
router.patch("/toggle-event", async (req, res) => {
  const { user_id, event_idx, updated_toggle, day_idx, month_idx } = req.body;

  const key =
    "date." + month_idx + ".days." + day_idx + ".events." + event_idx + ".done";

  console.log("key:", key);

  const userData = await Todos.findOneAndUpdate(
    { user_id },
    { $set: { [key]: updated_toggle } },
    { new: true }
  );

  res.send({ userData });
});

// @route   PATCH EVENT /api/events/update-event
// @desc    Update an event from a specific day
// @access  Private
router.patch("/update-event", async (req, res) => {
  const { user_id, event_idx, event_name, event_notes, day_idx, month_idx } =
    req.body;

  if (month_idx < 0 || day_idx < 0)
    return res.send({
      error: "Could not locate element to update, please try again",
    });

  const updatedEvent = { event: event_name, notes: event_notes };
  const key = "date." + month_idx + ".days." + day_idx + ".events." + event_idx;

  const updatedEvents = await Todos.findOneAndUpdate(
    { user_id },
    { $set: { [key]: [updatedEvent] } },
    { new: true }
  );

  if (!updatedEvents)
    return res.send({ error: "Error occured while updating the database" });

  res.send({ userTodoList: updatedEvents });
});

// @route   DELETE EVENT /api/events/remove-event
// @desc    Remove an event from a specific day
// @access  Private
router.delete("/remove-event", async (req, res) => {
  const { user_id, event_id, day_idx, month_idx } = req.body;

  const key = "date." + month_idx + ".days." + day_idx + ".events";

  const updatedTodoList = await Todos.findOneAndUpdate(
    { user_id },
    { $pull: { [key]: { _id: event_id } } },
    { new: true }
  );

  res.send({ userTodoList: updatedTodoList });
});

module.exports = router;
