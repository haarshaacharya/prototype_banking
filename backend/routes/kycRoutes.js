const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  submitKyc,
  getMyKyc
} = require("../controllers/kycController");

router.post("/submit", authMiddleware, submitKyc);

router.get("/me", authMiddleware, getMyKyc);

module.exports = router;