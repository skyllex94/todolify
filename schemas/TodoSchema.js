const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  google_calendar_refresh_token: { type: String },

  date: [
    {
      month_year: { type: String },
      days: [
        {
          day: { type: Number },
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
              event: { type: String },
              done: { type: Boolean },
              notes: { type: String },
              google_event_id: { type: String },
              google_start_date: { type: String },
              google_end_date: { type: String },
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

  goals: [
    {
      year: { type: Number },
      list: [
        {
          goal: { type: String },
          done: { type: Boolean },
        },
      ],
    },
  ],
});

module.exports = Todos = mongoose.model("todos", TodoSchema);
