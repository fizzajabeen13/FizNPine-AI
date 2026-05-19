// Import express
const express = require("express");

// Import CORS
const cors = require("cors");

// Import dotenv
require("dotenv").config();

// Create express app
const app = express();

// Import routes
const chatRoutes = require("./routes/chatRoutes");

// =============================
// MIDDLEWARE
// =============================

// Enable CORS
app.use(cors());

// Enable JSON handling
app.use(express.json());

// =============================
// ROUTES
// =============================
app.use("/api/chat", chatRoutes);

// =============================
// TEST ROUTE
// =============================

app.get("/", (req, res) => {
    res.send("FizNPine AI Backend is Running...");
});


// =============================
// PORT
// =============================

const PORT = process.env.PORT || 5000;


// =============================
// START SERVER
// =============================

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});