const router = require("express").Router();

router.post("/", (req, res) => {
  const { income, expense } = req.body;

  let savings = income - expense;
  let expensePercentage = (expense / income) * 100;
  let sipAmount = (income * 10) / 100;
  let sipAmount5 = (income * 5) / 100;

  let advice;

  if (expensePercentage < 75) {
    advice = `Great! Your expenses are only ${expensePercentage.toFixed(2)}% of your income. You can invest ₹${sipAmount.toFixed(2)} (10% of your monthly income) in SIP for long-term wealth creation.`;
  } else if (expensePercentage >= 75 && expensePercentage < 100) {
    advice = `Your expenses are ${expensePercentage.toFixed(2)}% of your income, which is a bit more. Cut down expenses on unnecessary things. If you have any debts, clear them first. After that, you can start investing ₹${sipAmount5.toFixed(2)} (5% of your income).`;
  } else if (savings < 5000) {
    advice = "Reduce expenses and build emergency fund.";
  } else if (savings < 20000) {
    advice = "Start SIP for long-term growth.";
  } else {
    advice = "You can balance EMI and SIP investments.";
  }

  res.json({ advice });
});

module.exports = router;