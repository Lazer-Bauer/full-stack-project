const mongoose = require("mongoose");
const JobsSchema = new mongoose.Schema([
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    topic: {
      type: String,
      minLength: 3,
    },
    content: {
      type: String,
      minlength: 5,
    },
    comment: {
      type: String,
      minLength: 5,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
]);
const Job = mongoose.model("jobs", JobsSchema, "Job");
module.exports = {
  Job,
};
