const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
const frontendBuildPath = path.join(__dirname, "..", "frontend", "build");
mongoose.set("bufferCommands", false);

// Middleware
app.use(cors());
app.use(express.json());

const requireDatabase = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: "Database unavailable. Check MONGO_URI and MongoDB Atlas network access." });
  }

  return next();
};

// Routes
app.use("/api/auth", requireDatabase, require("./routes/auth"));
app.use("/api/history", requireDatabase, require("./routes/history"));
app.use("/api/ai", require("./routes/ai"));

// DB Connection
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => {
      console.warn("MongoDB connection error:", err.message);
      console.warn("Server will continue running without database for now");
    });
} else {
  console.warn("MONGO_URI is not set. Configure it in Render Environment variables.");
  console.warn("Server will continue running without database for now");
}

// Root test
app.get("/", (req, res) => {
  res.send("API Running");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res) => {
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({ message: "API route not found" });
    }

    return res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
}

// Start server
const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () =>
  console.log(`Server running on port ${port}`)
);
