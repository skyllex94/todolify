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

// @route   GET EVENTS /events/
// @desc    Fetch all user events for the current month
// @access  Private
router.get("/:user_id/", async (req, res) => {
  const user_id = req.params.user_id;
  if (!user_id) return res.send({ error: "No user ID found" });

  const userTodoList = await getUserTodoList(user_id);
  if (!userTodoList)
    return res.send({ error: "No todo user list with events found" });
  res.send({ userTodoList });
});

// @route   POST EVENT /events/add-event
// @desc    Add an event to a specific day
// @access  Private
router.post("/add-event/", async (req, res) => {
  const user_id = req.body.user_id;
  const event_name = req.body.event_name;
  const date = req.body.full_date;
  console.log("date:", typeof date);

  console.log("full_date_BE:", date);

  // Make sure you await the fetching of the userTodoList
  const userTodoList = await getUserTodoList(user_id);
  if (!userTodoList) return res.send({ error: "No user todo list found" });

  let newEventList = { event: event_name, done: false, notes: "" };

  // // TODO: Check if day has events

  // If it doesn't
  const dateIdx = getEventsDateIdx(date, userTodoList.events);

  const newDate = { date, eventList: [newEventList] };

  userTodoList.events.push(newDate);
  await userTodoList.save();

  // const validIdx = idxIsValid(monthIdx, "month");
  // if (!validIdx) return res.send({ userTodoList, error: validIdx.error });

  // const dayIdx = getDayIdx(day, monthIdx, userTodoList);
  // const validDayIdx = idxIsValid(dayIdx, "day");
  // if (!validDayIdx) return res.send({ userTodoList, error: validDayIdx.error });

  // // Add-in the events array structure
  // const key = "date." + monthIdx + ".days." + dayIdx + ".events";

  // // newEvent = { events: [newEvent] };
  // console.log("newEvent:", [newEvent]);

  // const updatedTodoList = await Todos.findOneAndUpdate(
  //   { user_id },
  //   { $set: { [key]: newEvent } },
  //   { new: true }
  // );

  res.send({ userTodoList });
});

module.exports = router;
