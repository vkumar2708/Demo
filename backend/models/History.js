const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: String,
  input: Object,
  result: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("History", historySchema);