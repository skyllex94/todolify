const mongoose = require("mongoose");
const CategoriesSchema = require("./CategoriesSchema");

const TodoSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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
          events: [
            {
              id: {
                type: mongoose.Schema.Types.ObjectId,
              },
              event: {
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
