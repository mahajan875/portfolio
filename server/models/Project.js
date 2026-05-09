const mongoose = require("mongoose");

module.exports = mongoose.model("Project", new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  image: String,
}));