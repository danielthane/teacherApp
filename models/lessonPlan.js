const mongoose = require("mongoose");

const LessonPlanSchema = new mongoose.Schema({
  class: String,
  title: String,
  starter: String,
  main: String,
  plenary: String,
  date: String,
  period: Number,
});

const Lesson = mongoose.model("Lesson", LessonPlanSchema);

module.exports = Lesson;
