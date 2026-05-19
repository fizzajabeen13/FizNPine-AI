// Import express
const express = require("express");

// Create router
const router = express.Router();


// Import controller
const { chatController } = require("../controllers/chatController");


// =============================
// CHAT ROUTE
// =============================

router.post("/", chatController);


// Export router
module.exports = router;