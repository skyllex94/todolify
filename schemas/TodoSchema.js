const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  date: [
    {
      month_year: { type: String, required: true },
      days: [
        {
          day: { type: Number, required: true },
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
        },
      ],
    },
  ],

  // month_year: {
  //   type: String,
  //   day: {
  //     type: Number,
  //     categories: ["reached"],
  //   },
  // },

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
