const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverrride = require("method-override");
const Lesson = require("./models/lessonPlan");

// Database connection
mongoose.connect("mongodb://localhost:27017/teacherApp");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => {
  console.log("Database is connected");
});

// Initialise App
const app = express();
const port = 3500;
app.use(express.urlencoded({ extended: true }));
app.use(methodOverrride("_method"));

// Setting up ejs Properties
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Test Routes
app.get("/", (req, res) => {
  res.render("home");
});

// Routes for lessons

// Render the form to add a new lesson
app.get("/lessons/add", (req, res) => {
  res.render("lessons/add");
});

// Route to Add a new Lesson to DB
app.post("/lessons", async (req, res) => {
  const newLesson = new Lesson(req.body.lesson);
  await newLesson.save();
  res.redirect("/lessons");
});

// Show all lessons for a user
app.get("/lessons", async (req, res) => {
  const lessons = await Lesson.find({});
  res.render("lessons/showAll", { lessons });
});

// Show more detail of a given lesson
app.get("/lessons/:id", async (req, res) => {
  const { id } = req.params;
  const detailedLesson = await Lesson.findById(id);
  res.render("lessons/showOne", { detailedLesson });
});

// Serve Form to Update a Lesson
app.get("/lessons/:id/update", async (req, res) => {
  const { id } = req.params;
  const lessonToUpdate = await Lesson.findById(id);
  res.render("lessons/update", { lessonToUpdate });
});

// Put Request to Update a Lesson
app.put("/lessons/:id", async (req, res) => {
  const { id } = req.params;
  const lesson = await Lesson.findByIdAndUpdate(id, {
    ...req.body.lesson,
  });
  console.log(lesson._id);
  res.redirect(`/lessons/${lesson._id}`);
});

// Delete request method
app.delete("/lessons/:id", async (req, res) => {
  const { id } = req.params;
  await Lesson.findByIdAndDelete(id);
  res.redirect("/lessons");
});

app.listen(port, () => {
  console.log(`Serving app on port ${port}`);
});
