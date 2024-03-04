const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  weeklyTimetable: {
    type: [String], // Assuming an array of strings representing each day's timetable
    required: true
  },
  lessonPlans: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LessonPlan'
  }]
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
