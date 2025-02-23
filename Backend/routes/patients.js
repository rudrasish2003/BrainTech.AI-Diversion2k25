const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Ensure this is your MySQL connection file

// Function to execute MySQL queries as a Promise
const executeQuery = (query, values) => {
  console.log("🛠️ Running Query:", query);
  console.log("🔢 With Values:", values);

  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("❌ Query Execution Error:", err);
        reject(err);
      } else {
        console.log("✅ Query Success:", result);
        resolve(result);
      }
    });
  });
};

// Route to add a new patient
router.post("/add", async (req, res) => {
  console.log("received data", req.body);
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      height,
      weight,
      bloodGroup,
      address,
      medicalHistory,
      allergies,
      currentMedications,
      profileImage,
    } = req.body;

    // Debugging: Log incoming data
    console.log("Received Data:", req.body);

    // Ensure required fields are provided
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `INSERT INTO patients 
        (firstName, lastName, email, phone, dob, gender, height, weight, 
         bloodGroup, address, medicalHistory, allergies, currentMedications, profileImage) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      height,
      weight,
      bloodGroup,
      address,
      medicalHistory,
      allergies,
      currentMedications,
      profileImage,
    ];

    // Execute the query and log the result
    const result = await executeQuery(sql, values);
    console.log("Insert Result:", result);

    res.status(201).json({ message: "Patient profile added successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Missing email parameter" });
    }

    const sql = "SELECT * FROM patients WHERE email = ?";
    const result = await executeQuery(sql, [email]);

    if (result.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
