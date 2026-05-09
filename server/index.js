const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/contact", require("./routes/contact"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => console.log("Server running"));