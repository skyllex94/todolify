const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User schema (model) for posting data in the DB
const User = require("../schemas/UserSchema");
const TodoSchema = require("../schemas/TodoSchema");

// @route   POST /users
// @desc    Register User
// @access  Public
router.post(
  "/",
  // This is the middleware validation for verifying the input data type
  [
    // Type cheking each field on the back end
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If there are errors, return a bad response wt error message
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Search for user wt findOne filter func
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Reinnitialize the user to a new user wt its schema and populed the info in it
      user = new User({
        name,
        email,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      // Creates the hashed password and save it in the user object
      user.password = await bcrypt.hash(password, salt);
      // Save user to MongoDB wt save function (Promise)
      await user.save();

      // Create the jsonwebtoken payload to be returned
      const payload = {
        user: {
          // Getting the id from the instance of User we created (since it's a Promise) and sent to MongoDB
          id: user.id,
        },
      };

      // Create the initial todoList configuration for the new user
      try {
        const userTodoList = new TodoSchema({
          user_id: user.id,
          categories: [
            {
              category: "Skillset to Build",
              tasks: [
                {
                  task: "Daily tasks",
                  done: false,
                },
              ],
            },
            {
              category: "Mundane",
              tasks: [
                {
                  task: "Your everyday tasks",
                  done: false,
                },
              ],
            },
          ],
        });
        console.log(userTodoList);
        await userTodoList.save();
      } catch (error) {
        console.log(error.message);
      }

      // Create the jsonwebtoken / 3rd paramether could be object of expiresIn
      jwt.sign(payload, process.env.jwtSecret, {}, (err, token) => {
        if (err) throw err;
        // Send back a responce from the server of the jwt we created
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500, "Server error");
    }
  }
);

module.exports = router;
