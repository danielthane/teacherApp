const express = require("express");
const router = express.Router();
const Class = require(".././models/classData");

// Shows all classes
router.get("/", async (req, res) => {
  const classes = await Class.find({});
  res.render("classes/showAll", { classes });
});

// Serves New Class Form
router.get("/add", (req, res) => {
  res.render("classes/add");
});

// Deals with form submision
router.post("/", async (req, res) => {
  const newClass = new Class(req.body.classData);
  newClass.save();
  res.redirect("/classes");
});

// Show Detailed Class Information
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const detailedClass = await Class.findById(id);
  res.render("classes/showOne", { detailedClass });
});

// Serves Form To Edit a Class
router.get("/:id/update", async (req, res) => {
  const { id } = req.params;
  const classToUpdate = await Class.findById(id);
  res.render("classes/update", { classToUpdate });
});

// Updates the class with information from form above
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const classData = await Class.findByIdAndUpdate(id, {
    ...req.body.classData,
  });
  res.redirect(`/classes/${id}`);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Class.findByIdAndDelete(id);
  res.redirect("/classes");
});

module.exports = router;
