const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  categories: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
      },
      category: {
        type: String,
        required: true,
      },
      tasks: [
        {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
          },
          task: {
            type: String,
          },
          done: {
            type: Boolean,
          },
        },
      ],
    },
  ],
});

module.exports = Todos = mongoose.model("todos", TodoSchema);
