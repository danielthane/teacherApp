const express = require("express");
const router = express.Router();
const Lesson = require(".././models/lessonPlan");
const Class = require("../models/classData");

// Show all Lessons
router.get("/", async (req, res) => {
  const lessons = await Lesson.find({});
  res.render("lessons/showAll", { lessons });
});

// Render the form to add a new lesson
router.get("/add", (req, res) => {
  res.render("lessons/add");
});

// Route to Add a new Lesson to DB
router.post("/", async (req, res) => {
  const newLesson = new Lesson(req.body.lesson);
  const currentClass = await Class.findOne({ className: newLesson.class });
  currentClass.lessons.push(newLesson);
  await newLesson.save();
  await currentClass.save();
  res.redirect("/lessons");
});

// Show more detail of a given lesson
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const detailedLesson = await Lesson.findById(id);
  res.render("lessons/showOne", { detailedLesson });
});

// Serve Form to Update a Lesson
router.get("/:id/update", async (req, res) => {
  const { id } = req.params;
  const lessonToUpdate = await Lesson.findById(id);
  res.render("lessons/update", { lessonToUpdate });
});

// Put Request to Update a Lesson
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const lesson = await Lesson.findByIdAndUpdate(id, {
    ...req.body.lesson,
  });
  res.redirect(`/lessons/${lesson._id}`);
});

// Delete request method
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Lesson.findByIdAndDelete(id);
  res.redirect("/lessons");
});

module.exports = router;
