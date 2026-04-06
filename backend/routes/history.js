const router = require("express").Router();
const History = require("../models/History");
const auth = require("../middleware/authMiddleware");

// Save history
router.post("/", auth, async (req, res) => {
  try {
    const data = await History.create({
      ...req.body,
      userId: req.user.id
    });
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get history
router.get("/", auth, async (req, res) => {
  try {
    const data = await History.find({ userId: req.user.id });
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;