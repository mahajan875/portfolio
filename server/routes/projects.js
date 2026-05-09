const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");
const multer = require("multer");

// storage config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });

// GET all projects
router.get("/", async (req, res) => {
  res.json(await Project.find());
});

// ADD project (with image)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      technologies: req.body.technologies
        ? req.body.technologies.split(",")
        : [],
      githubUrl: req.body.githubUrl,
      liveUrl: req.body.liveUrl,
      image: req.file ? req.file.filename : ""
    });

    const saved = await project.save();
    res.json(saved);

  } catch (err) {
    console.log(err);
    res.status(400).json("Error adding project");
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json("Project Deleted");
  } catch (err) {
    console.log(err);
    res.status(404).json("Project not found");
  }
});

module.exports = router;