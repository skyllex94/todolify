const express = require("express");
// Global environment setting
require("dotenv").config();
const connectDB = require("./config/mongodb");
const app = express();
const path = require("path");

// Connect MongoDB Atlas
connectDB();

// Init middleware for parsing the body payload object
app.use(express.json({ extended: false }));

// Define Routes
app.use("/users", require("./routes/users"));
app.use("/user", require("./routes/auth"));
app.use("/user", require("./routes/todos"));

// Serve static in production
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
