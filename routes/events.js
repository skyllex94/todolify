const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const Todos = require("../schemas/TodoSchema");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CALENDAR_CLIENT_ID,
  process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
  "http://localhost:3000"
);

const {
  getMonthIdx,
  idxIsValid,
  getDayIdx,
  getUserTodoList,
} = require("./helper_funcs");

// @route   POST /api/events/check_refresh_token
// @desc    Check if there is already a refresh token for Google Calendar for curr user
// @access  Private
router.post("/check_refresh_token", async (req, res) => {
  try {
    const { user_id } = req.body;

    const userTodoList = await Todos.findOne({ user_id });
    const isRefreshToken = userTodoList.google_calendar_refresh_token;

    if (!isRefreshToken) res.send({ refreshTokenExist: false });
    res.send({ refreshTokenExist: true });
  } catch (err) {
    console.error(err);
  }
});

// @route   POST /api/events/sync_calendar
// @desc    Sync with Google Calendar API and retrieve all data from there
// @access  Private
router.post("/sync_calendar", async (req, res) => {
  try {
    const { auth_code, user_id } = req.body;
    const { tokens } = await oauth2Client.getToken(auth_code);
    if (tokens?.code === 400)
      res.send({
        status: 400,
        message: "Error occured while creating the token",
      });
    oauth2Client.setCredentials(tokens);

    // Save refresh token on the database for the auth user
    const { refresh_token } = tokens;
    console.log("refresh_token FROM SYNC:", refresh_token);

    if (refresh_token !== null || refresh_token !== undefined)
      console.log("You should already have a refresh token being stored");

    // Find current user in database
    const userTodoList = await Todos.findOne({ user_id });
    if (!userTodoList)
      return res.send({ error: "Could not find user todo list" });

    // Mongoose query for inserting the new month
    const result = await Todos.updateOne(
      { user_id },
      { $set: { google_calendar_refresh_token: refresh_token.toString() } }
    );

    console.log("result:", result);
    const { modifiedCount, acknowledged } = result;
    if (modifiedCount <= 0 || acknowledged === false) {
      res.send({
        status: 402,
        message: "Could not store Google Calendar's refresh token",
      });
    }

    res.send({
      status: 200,
      message:
        "Successfully exchanged data and stored the refresh token for the user",
    });
  } catch (err) {
    console.error(err);
  }
});

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
  const {
    user_id,
    event_name,
    event_time,
    duration,
    day,
    month_year,
    notes,
    linked_calendars,
    google_calendar_color,
  } = req.body;

  const userTodoList = await getUserTodoList(user_id);
  if (!userTodoList) return res.send({ error: "No user todo list found" });
  let google_event_id = null,
    google_start_date = null,
    google_end_date = null;

  // Google Calendar API Call and creation of the event in Google Calendar

  const refresh_token = userTodoList?.google_calendar_refresh_token;

  // Check if linked_calendar is true in LS + DB has refresh token
  if (linked_calendars === true && refresh_token) {
    const splitMonthYear = month_year.split("/");
    const splitInitTime = event_time.split(":");

    console.log("WE ARE IN LINKED CALENDARS");

    // Add zero padding to the date when necessary
    function zeroPad(num) {
      return ("0" + num).slice(-2);
    }

    // DateTime format - "1995-12-17T03:24:00"
    const googleStartDate = `${splitMonthYear[1]}-${zeroPad(
      splitMonthYear[0]
    )}-${zeroPad(day)}T${zeroPad(splitInitTime[0])}:${zeroPad(
      splitInitTime[1]
    )}:00`;

    // Event oveflowing the current day and going in the next one
    let dayAddup = day;
    let endDateHourTime = parseInt(splitInitTime[0]) + parseInt(duration);
    if (endDateHourTime <= 9) endDateHourTime = 0 + endDateHourTime.toString();
    if (endDateHourTime >= 24) {
      endDateHourTime %= 24;
      endDateHourTime = 0 + endDateHourTime.toString();
      dayAddup = parseInt(day) + 1;
    }

    const googleEndDate = `${splitMonthYear[1]}-${zeroPad(
      splitMonthYear[0]
    )}-${zeroPad(dayAddup)}T${zeroPad(endDateHourTime)}:${zeroPad(
      splitInitTime[1]
    )}:00`;

    console.log("googleStartDate:", googleStartDate);
    console.log("startDate:", new Date(googleStartDate));

    console.log("googleEndDate:", googleEndDate);
    console.log("endDate:", new Date(googleEndDate));

    // Retrieve refresh token from DB

    if (refresh_token === null) {
      res.send({
        userTodoList,
        error: "Could not find any refresh token for the given user.",
      });
    }

    // Set Google Calendar API credentials for the user
    oauth2Client.setCredentials({ refresh_token });

    // Send the event to Google Calendar API
    try {
      const calendar = google.calendar("v3");
      const googleEventObj = await calendar.events.insert({
        auth: oauth2Client,
        calendarId: "primary",
        requestBody: {
          summary: event_name,
          description: notes,
          colorId: JSON.parse(google_calendar_color),
          start: {
            dateTime: new Date(googleStartDate),
          },
          end: {
            dateTime: new Date(googleEndDate),
          },
        },
      });

      // Check if we were not able to create the calendar event
      const { status, statusText, data } = googleEventObj;

      if (status < 200 && status > 300) {
        res.send({ userTodoList, error: statusText });
      }

      // Google identifier for updating and removing event
      google_event_id = data.id;
      google_start_date = googleStartDate;
      google_end_date = googleEndDate;
    } catch (err) {
      console.log(`Error with the Google Service: ${err}`);

      if (err.toString().includes("invalid_grant") === true) {
        const removed_expired_token = await Todos.findOneAndUpdate(
          { user_id },
          { $set: { google_calendar_refresh_token: null } },
          { new: true }
        );
        res.send({
          userTodoList: removed_expired_token,
          error:
            "The granted access to your Google Calendar has expired, please sign-in again",
        });
      }
      res.send({ userTodoList, error: err });
    }
  }

  // Local database calendar event creation
  let newEvent = { event: event_name, done: false, notes };
  if (linked_calendars && google_event_id)
    newEvent = {
      ...newEvent,
      google_event_id,
      google_start_date,
      google_end_date,
    };
  console.log("newEvent:", newEvent);

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
  console.log("WE ARE TO THE END");

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
  const {
    user_id,
    event_idx,
    event_name,
    event_notes,
    day_idx,
    month_idx,
    google_event_id,
    google_start_date,
    google_end_date,
    linked_calendars,
  } = req.body;

  console.log(
    "google_event_id:",
    google_event_id,
    google_start_date,
    google_end_date
  );

  const userTodoList = await Todos.findOne({ user_id });

  // Google Calendar Updating if the calendars are linked
  if (google_event_id && linked_calendars) {
    // Retrieve refresh token from DB
    const refresh_token = userTodoList?.google_calendar_refresh_token;
    if (!refresh_token)
      res.send({
        userTodoList,
        error: "Could not find any refresh token for the given user.",
      });

    // Set Google Calendar API credentials for the user
    oauth2Client.setCredentials({ refresh_token });

    try {
      const calendar = google.calendar("v3");
      const googleEventObj = await calendar.events.update({
        auth: oauth2Client,
        calendarId: "primary",
        eventId: google_event_id,
        requestBody: {
          start: {
            dateTime: new Date(google_start_date),
          },
          end: {
            dateTime: new Date(google_end_date),
          },
          summary: event_name,
          description: event_notes,
        },
      });

      // Check if we were not able to create the calendar event
      const { status, statusText } = googleEventObj;

      if (status < 200 && status > 300) {
        res.send({ userTodoList, error: statusText });
      }
    } catch (err) {
      console.log(`Error with the Google Service: ${err}`);

      if (err.toString().includes("invalid_grant") === true) {
        const removed_expired_token = await Todos.findOneAndUpdate(
          { user_id },
          { $set: { google_calendar_refresh_token: null } },
          { new: true }
        );
        res.send({
          userTodoList: removed_expired_token,
          error:
            "The granted access to your Google Calendar has expired, please sign-in again",
        });
      }
      res.send({ userTodoList, error: err });
    }
  }

  if (month_idx < 0 || day_idx < 0)
    return res.send({
      userTodoList,
      error: "Could not locate element to update, please try again",
    });

  const updatedEvent = {
    event: event_name,
    notes: event_notes,
    google_event_id,
    google_start_date,
    google_end_date,
  };
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
  const {
    user_id,
    event_id,
    day_idx,
    month_idx,
    google_event_id,
    linked_calendars,
  } = req.body;
  console.log("google_event_id:", google_event_id);

  // Remove event if present in Google Calendar
  if (google_event_id && linked_calendars) {
    const userTodoList = await Todos.findOne({ user_id });
    // Retrieve refresh token from DB
    const refresh_token = userTodoList?.google_calendar_refresh_token;
    if (!refresh_token)
      res.send({
        userTodoList,
        error: "Could not find any refresh token for the given user.",
      });

    // Set Google Calendar API credentials for the user
    oauth2Client.setCredentials({ refresh_token });

    try {
      const calendar = google.calendar("v3");
      const googleEventObj = await calendar.events.delete({
        auth: oauth2Client,
        calendarId: "primary",
        eventId: google_event_id,
      });

      // Check if we were not able to create the calendar event
      const { status, statusText } = googleEventObj;

      if (status < 200 && status > 300) {
        res.send({ userTodoList, error: statusText });
      }
    } catch (err) {
      console.log(`Error in deleting Google Calendar Event: ${err} `);

      if (err.toString().includes("invalid_grant") === true) {
        const removed_expired_token = await Todos.findOneAndUpdate(
          { user_id },
          { $set: { google_calendar_refresh_token: null } },
          { new: true }
        );
        res.send({ userTodoList: removed_expired_token, error: err });
      }
      res.send({
        userTodoList,
        error:
          "The granted access to your Google Calendar has expired, please sign-in your Google Calendar again",
      });
    }
  }

  // Remove from local calendar
  const key = "date." + month_idx + ".days." + day_idx + ".events";
  const updatedTodoList = await Todos.findOneAndUpdate(
    { user_id },
    { $pull: { [key]: { _id: event_id } } },
    { new: true }
  );

  res.send({ userTodoList: updatedTodoList });
});

module.exports = router;
