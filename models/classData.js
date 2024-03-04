const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  keyStage: String,
  classSize: Number,
  teacher: String,
  // teacher: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Teacher",
  // },
  otherInfo: String,
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
});

module.exports = mongoose.model("Class", classSchema);
