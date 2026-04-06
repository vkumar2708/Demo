const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/history", require("./routes/history"));
app.use("/api/ai", require("./routes/ai"));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.warn("MongoDB connection error:", err.message);
    console.warn("Server will continue running without database for now");
  });

// Root test
app.get("/", (req, res) => {
  res.send("API Running");
});

// Start server
app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);