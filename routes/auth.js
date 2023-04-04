const express = require("express");
const router = express.Router();
require("dotenv").config();
const mwAuth = require("../middleware/mwAuth");
const User = require("../schemas/UserSchema");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @route   GET /user
// @desc    Fetch user
// @access  Private
router.get("/", mwAuth, async (req, res) => {
  try {
    // Since setting decoded value of jwt, we can find the user by id wt req.user
    // findById being a mongoose func to call the MongoDB with connect() & search for id in this case
    // When fetching, leave the password out of the dataset
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
    console.log(res.json);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST /user
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/",
  // This is the middleware express-validator validation for the input data type
  [
    // Type cheking each field on the back end
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If there are errors, return a bad response wt error message
    if (!errors.isEmpty()) {
      console.log("Here in error validationResults");
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Make a request to get the user from the cloud DB
      let user = await User.findOne({ email });
      console.log("user:", user);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Compare login password with the password we have in the DB
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Create the jsonwebtoken payload to be returned user
      const payload = {
        user: {
          // Getting the id from the instance of User we got back
          id: user.id,
        },
      };

      // Create the jsonwebtoken / 3rd paramether could be object of expiresIn
      jwt.sign(payload, process.env.jwtSecret, {}, (err, token) => {
        if (err) throw err;
        // Send back a response from server of the jwt we created
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500, "Server error");
    }
  }
);

module.exports = router;
