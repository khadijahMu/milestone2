require("dotenv").config(); 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const app = express();
const PORT = process.env.PORT || 10000; 
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1); 
  });
//  Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON requests
// API Routes
app.use("/api/users", userRoutes);
// Root Route
app.get("/", (req, res) => {
  res.send("My Second Express App Milestone 2!!!");
});
// Error Handling for Unknown Routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
//  Start Server 
app.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running on http://0.0.0.0:${PORT}`);
});
