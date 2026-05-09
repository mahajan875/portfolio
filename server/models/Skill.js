const mongoose = require("mongoose");

module.exports = mongoose.model("Skill", new mongoose.Schema({
  name: String,
  category: String,
  proficiency: Number,
  icon: String,
}));