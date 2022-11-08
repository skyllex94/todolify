const express = require("express");
const connectDB = require("./config/mongodb");
const app = express();

// Connect MongoDB
connectDB();

// Init middleware for parsing the body payload object
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/users", require("./routes/users"));
app.use("/user", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
