const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  category: {
    type: String,
  },
  //   icon: {
  //     type: Number,
  //   },
  //   activeFrom: {
  //     type: String,
  //   },
  //   activeUntil: {
  //     type: String,
  //   },
  //   timeDuration: {
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
});

module.exports = curCtgries = mongoose.model("categories", CategoriesSchema);
