const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");

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

// Setting up ejs Properties
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Test Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Serving app on port ${port}`);
});
