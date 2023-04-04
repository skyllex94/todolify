const express = require("express");
require("dotenv").config();
const connectDB = require("./config/mongodb");
const app = express();

const push = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// Push Notifications Subscription Route
// app.post("/subscribe", (req, res) => {
//   const publicVapidKey =
//     "BFt1wp7hs6lZu_zeV59YpHaBKADr4mQal6pYJz-PqkIJM-ybL8nWaeTSfDpQAivuYx65cvyQ1o33uW3rJYSbfYs";

//   push.setVapidDetails(
//     "mailto:test@test.com",
//     publicVapidKey,
//     process.env.VAPID_PRIVATE_KEY
//   );

//   // Get push subscription object
//   console.log(
//     "publicVapidKey:",
//     publicVapidKey,
//     "privateKey:",
//     process.env.VAPID_PRIVATE_KEY
//   );
//   console.log("Here I am");
//   const { stringified_subscription } = req.body;
//   console.log("subscription:", stringified_subscription);

//   // Send 201 Status
//   res.status(201).json({});
//   const payload = JSON.stringify({ title: "Push Test" });

//   // Pass object into sendNotification
//   push
//     .sendNotification(stringified_subscription, "test message")
//     .catch((err) => console.error(err));
// });

// Connect MongoDB Atlas
connectDB();

// Init middleware for parsing the body payload object
app.use(express.json({ extended: false }));

// Define Routes
app.use("/users", require("./routes/users"));
app.use("/api/user", require("./routes/auth"));
app.use("/api/user", require("./routes/todos"));
app.use("/api/events", require("./routes/events"));
app.use("/api/goals", require("./routes/goals"));
app.use("/api/settings", require("./routes/settings"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  // Serve the static assets wt index.html as the beginning route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
