const express = require("express");
require("dotenv").config();
const connectDB = require("./config/mongodb");
const app = express();

const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

// app.use(bodyParser.json());

const publicVapidKey =
  "BFt1wp7hs6lZu_zeV59YpHaBKADr4mQal6pYJz-PqkIJM-ybL8nWaeTSfDpQAivuYx65cvyQ1o33uW3rJYSbfYs";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  process.env.VAPID_PRIVATE_KEY
);

// Push Notifications Subscribe Route

app.post("/subscribe", (req, res) => {
  // Get push subscription object
  console.log("Here I am");
  const subscription = req.body;
  console.log("subscription:", subscription);

  // Send 201 Status
  res.status(201).json({});
  const payload = JSON.stringify({ title: "Push Test" });
  console.log(payload);

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

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
