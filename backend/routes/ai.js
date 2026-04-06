const router = require("express").Router();

router.post("/", (req, res) => {
  const { income, expense } = req.body;

  let savings = income - expense;

  let advice;

  if (savings < 5000) {
    advice = "Reduce expenses and build emergency fund.";
  } else if (savings < 20000) {
    advice = "Start SIP for long-term growth.";
  } else {
    advice = "You can balance EMI and SIP investments.";
  }

  res.json({ advice });
});

module.exports = router;