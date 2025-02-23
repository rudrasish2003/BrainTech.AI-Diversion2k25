const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Route to fetch notifications for a specific user
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  // Validate userId
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const query = `
    SELECT * FROM notifications
    WHERE userId = ?
    ORDER BY created_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching notifications:", err);
      return res.status(500).json({ error: "Failed to fetch notifications" });
    }

    res.status(200).json({ notifications: results });
  });
});

module.exports = router;
