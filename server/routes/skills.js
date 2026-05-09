const router = require("express").Router();
const Skill = require("../models/Skill");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  res.json(await Skill.find());
});

router.post("/", auth, async (req, res) => {
  try {
    const { name, category, proficiency, icon } = req.body;

    // ✅ basic validation
    if (!name || !category || !proficiency) {
      return res.status(400).json("Missing required fields");
    }

    const skill = new Skill({
      name,
      category,
      proficiency,
      icon: icon || "default"
    });

    const saved = await skill.save();

    res.json(saved);

  } catch (err) {
    console.log(err);
    res.status(400).json("Error saving skill");
  }
});

router.put("/:id", auth, async (req, res) => {
  await Skill.findByIdAndUpdate(req.params.id, req.body);
  res.json("Updated");
});

router.delete("/:id", auth, async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;