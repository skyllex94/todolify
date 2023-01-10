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
      },
      category: {
        type: String,
      },
      icon: {
        type: Number,
      },
      activeFrom: {
        type: String,
      },
      activeUntil: {
        type: String,
      },
      timeDuration: {
        type: String,
      },
      tasks: [
        {
          id: {
            type: mongoose.Schema.Types.ObjectId,
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

// {
//   id: {
//     type: mongoose.Schema.Types.ObjectId,
//   },
//   category: {
//     type: String,
//   },
//   tasks: [
//     {
//       id: {
//         type: mongoose.Schema.Types.ObjectId,
//       },
//       task: {
//         type: String,
//       },
//       done: {
//         type: Boolean,
//       },
//     },
//   ],
// },
